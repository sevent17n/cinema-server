import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common"
import { RatingService } from "./rating.service"
import { IdValidationPipe } from "../pipes/id.validation.pipe"
import { User } from "../user/decorators/user.decorator"
import { Auth } from "../auth/decorators/auth.decorator"
import { Types } from "mongoose"
import { RatingDto } from "./rating.dto"

@Controller("ratings")
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}
  @Get(":moveId")
  @Auth()
  async getMovieValue(
    @Param("moveId", IdValidationPipe) moveId: Types.ObjectId,
    @User("_id") _id: Types.ObjectId
  ) {
    return this.ratingService.getMovieValueByUser(moveId, _id)
  }
  @UsePipes(new ValidationPipe())
  @Post("set-rating")
  @HttpCode(200)
  @Auth()
  async setRating(@User("_id") _id: Types.ObjectId, @Body() dto: RatingDto) {
    return this.ratingService.setRating(_id, dto)
  }
}
