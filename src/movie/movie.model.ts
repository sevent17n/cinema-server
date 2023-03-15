import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"
import { prop, Ref } from "@typegoose/typegoose"
import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator"
import { ActorModel } from "../actor/actor.model"
import { GenreModel } from "../genre/genre.model"

export interface MovieModel extends Base {}
export class Parameters {
  @prop()
  year: number
  @prop()
  duration: number
  @prop()
  country: string
}
export class MovieModel extends TimeStamps {
  @IsNumber()
  year: number

  @IsNumber()
  kinopoiskId: number
  duration: number
  @IsString()
  country: string

  @prop()
  poster: string

  @prop()
  bigPoster: string

  @prop()
  title: string

  @prop()
  parameters?: Parameters

  @prop({ unique: true })
  slug: string

  @prop({ default: 4.0 })
  rating?: number
  @prop()
  description: string
  @prop({ default: 0 })
  countOpened?: number
  @prop()
  videoUrl: string
  @prop({ ref: () => GenreModel })
  genres: Ref<GenreModel>[]

  @prop({ ref: () => ActorModel })
  actors: Ref<ActorModel>[]

  @prop({ default: false })
  isSendTelegram?: boolean
}
