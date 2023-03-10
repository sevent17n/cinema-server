import { Module } from "@nestjs/common"
import { RatingController } from "./rating.controller"
import { RatingService } from "./rating.service"
import { TypegooseModule } from "nestjs-typegoose"
import { RatingModel } from "./rating.model"
import { MovieModule } from "../movie/movie.module"
import { MovieModel } from "../movie/movie.model"
import { MovieService } from "../movie/movie.service"

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: RatingModel,
        schemaOptions: {
          collection: "Rating"
        }
      }
    ]),
    MovieModule
  ],
  controllers: [RatingController],
  providers: [RatingService],
  exports: [RatingService]
})
export class RatingModule {}
