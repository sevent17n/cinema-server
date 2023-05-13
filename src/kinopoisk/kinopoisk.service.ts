import axios from "axios"
import { InjectModel } from "nestjs-typegoose"
import { ModelType } from "@typegoose/typegoose/lib/types"
import { MovieModel } from "../movie/movie.model"
import { MovieDto } from "../movie/movie.dto"
import generateSlug from "../utils/generateSlug"

export class KinopoiskService {
  constructor(
    @InjectModel(MovieModel)
    private readonly MovieModel: ModelType<MovieModel>
  ) {}
  async createMovieAccordingKinopoiskApi(kinopoiskId: string) {
    try {
      const actor = await axios.get(
        "https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=1267348",
        {
          headers: {
            "X-API-KEY": "0dc4f952-bf52-40f0-86f4-a9cb6da9c767",
            "Content-Type": "application/json"
          }
        }
      )
      const { data } = await axios.get(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/${kinopoiskId}`,
        {
          headers: {
            "X-API-KEY": "0dc4f952-bf52-40f0-86f4-a9cb6da9c767",
            "Content-Type": "application/json"
          }
        }
      )
      const values: MovieDto = {
        bigPoster: data.posterUrl,
        actors: [],
        genres: data.genres.genre,
        description: data.description,
        poster: data.posterUrlPreview,
        title: data.nameRu,
        kinopoiskId: data.kinopoiskId,
        slug: generateSlug(data.nameRu),
        parameters: {
          year: data.year,
          duration: data.filmLength,
          country: data.countries[0].country
        }
      }
      const options = {
        $or: [
          {
            title: new RegExp(generateSlug(data.nameRu), "i")
          }
        ]
      }
      const findMovie = await this.MovieModel.findOne(options)
      if (findMovie) {
        const kinopoiskMovie = await this.MovieModel.updateOne(values)
        return kinopoiskMovie.upsertedId
      } else {
        const kinopoiskMovie = await this.MovieModel.create(values)
        return kinopoiskMovie.id
      }
    } catch (e) {
      return e
    }
  }
}
