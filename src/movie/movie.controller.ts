import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from "@nestjs/common"
import { Auth } from "../auth/decorators/auth.decorator"
import { IdValidationPipe } from "../pipes/id.validation.pipe"
import { MovieService } from "./movie.service"
import { MovieDto } from "./movie.dto"
import { Types } from "mongoose"

@Controller("movies")
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Get("by-slug/:slug")
  async bySlug(@Param("slug") slug: string) {
    return this.movieService.bySlug(slug)
  }

  @Get("by-actor/:actorId")
  async byActor(@Param("actorId", IdValidationPipe) actorId: Types.ObjectId) {
    return this.movieService.byActor(actorId)
  }

  @UsePipes(new ValidationPipe())
  @Post("by-genres")
  @HttpCode(200)
  async byGenres(
    @Body("genreIds") genreIds: Types.ObjectId[],
    @Query("limit") limit?: number,
    @Query("page") page?: number
  ) {
    return this.movieService.byGenres(genreIds, limit, page)
  }
  @Put("update-count-opened")
  @HttpCode(200)
  async updateCountOpened(@Body("slug") slug: string) {
    return this.movieService.updateCountOpened(slug)
  }

  @Get()
  async getAll(
    @Query("searchTerm") searchTerm?: string,
    @Query("limit") limit?: number,
    @Query("page") page?: number
  ) {
    return this.movieService.getAll(searchTerm, limit, page)
  }

  @Get("most-popular")
  async mostPopular(
    @Query("limit") limit?: number,
    @Query("page") page?: number
  ) {
    return this.movieService.getMostPopular(limit, page)
  }
  @Get(":id")
  @Auth("admin")
  async get(@Param("id", IdValidationPipe) id: string) {
    return this.movieService.byId(id)
  }
  @UsePipes(new ValidationPipe())
  @Put(":id")
  @HttpCode(200)
  @Auth("admin")
  async update(
    @Param("id", IdValidationPipe) id: string,
    @Body() dto: MovieDto
  ) {
    return this.movieService.update(id, dto)
  }
  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth("admin")
  async create() {
    return this.movieService.create()
  }

  @Delete(":id")
  @HttpCode(200)
  @Auth("admin")
  async delete(@Param("id", IdValidationPipe) id: string) {
    return this.movieService.delete(id)
  }
}
