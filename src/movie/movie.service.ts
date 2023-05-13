import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common"
import { InjectModel } from "nestjs-typegoose"
import { MovieModel } from "./movie.model"
import { ModelType } from "@typegoose/typegoose/lib/types"
import { MovieDto } from "./movie.dto"
import { Types } from "mongoose"

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MovieModel) private readonly MovieModel: ModelType<MovieModel>
  ) {}
  async bySlug(slug: string) {
    const movie = await this.MovieModel.findOne({ slug })
      .populate("actors genres")
      .exec()
    if (!movie) {
      throw new NotFoundException("Movie not found")
    }
    return movie
  }
  async byActor(actorId: Types.ObjectId) {
    const movie = await this.MovieModel.find({ actors: actorId }).exec()
    if (!movie) {
      throw new NotFoundException("Movies not found")
    }
    return movie
  }
  async byGenres(genreIds: Types.ObjectId[], limit?: number, page?: number) {
    const movie = await this.MovieModel.find({
      genres: { $in: genreIds }
    })
      .skip(page)
      .limit(limit)
      .exec()
    if (!movie) {
      throw new NotFoundException("Movies not found")
    }
    return movie
  }
  async getMostPopular(limit?: number, page?: number) {
    return this.MovieModel.find({ countOpened: { $gt: 0 } })
      .skip(page)
      .limit(limit)
      .sort({ countOpened: -1 })
      .populate("genres")
      .exec()
  }

  async getAll(searchTerm?: string, limit?: number, page?: number) {
    let options = {}
    if (searchTerm || limit || (limit && page)) {
      options = {
        $or: [
          {
            title: new RegExp(searchTerm, "i")
          }
        ]
      }
    }
    return this.MovieModel.find(options)
      .skip(page)
      .limit(limit)
      .select("-updatedAt -__v")
      .sort({ createdAt: "desc" })
      .populate("actors genres")
      .exec()
  }
  async byId(_id: string) {
    const movie = await this.MovieModel.findById(_id)
    if (!movie) {
      throw new NotFoundException("Movie not found")
    }
    return movie
  }
  async create() {
    const defaultValue: MovieDto = {
      bigPoster: "",
      actors: [],
      genres: [],
      description: "",
      poster: "",
      title: "",
      kinopoiskId: "",
      slug: ""
    }
    const movie = await this.MovieModel.create(defaultValue)
    return movie._id
  }

  async update(_id: string, dto: MovieDto) {
    const updateDoc = await this.MovieModel.findByIdAndUpdate(_id, dto, {
      new: true
    }).exec()
    if (!updateDoc) {
      throw new NotFoundException("Movie not found")
    }
    return updateDoc
  }
  async updateCountOpened(slug: string) {
    const updateDoc = await this.MovieModel.findOneAndUpdate(
      { slug },
      { $inc: { countOpened: 1 } },
      {
        new: true
      }
    ).exec()
    if (!updateDoc) {
      throw new NotFoundException("Movie not found")
    }
    return updateDoc
  }
  async delete(id: string) {
    const deleteDoc = this.MovieModel.findByIdAndDelete(id).exec()
    if (!deleteDoc) {
      throw new NotFoundException("Movie not found")
    }
    return deleteDoc
  }

  async UpdateRating(id: Types.ObjectId, newRating: number) {
    const rating = this.MovieModel.findByIdAndUpdate(
      id,
      {
        rating: newRating
      },
      {
        new: true
      }
    ).exec()
    if (newRating > 5 || newRating < 0) {
      throw new BadRequestException(
        "Еблан на админе че ты за хуйню пишешь. Рейтинг не может быть 228"
      )
    }
  }
  async sendNotifications(dto: MovieDto) {
    return null
  }
}
