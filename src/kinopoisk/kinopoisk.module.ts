import { Module } from "@nestjs/common"
import { TypegooseModule } from "nestjs-typegoose"
import { KinopoiskController } from "./kinopoisk.controller"
import { KinopoiskService } from "./kinopoisk.service"
import { MovieModel } from "../movie/movie.model"

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: MovieModel,
        schemaOptions: {
          collection: "Movie"
        }
      }
    ])
  ],
  controllers: [KinopoiskController],
  providers: [KinopoiskService]
})
export class KinopoiskModule {}
