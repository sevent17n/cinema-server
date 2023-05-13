import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsString
} from "class-validator"

export class Parameters {
  @IsNumber()
  year: number
  @IsNumber()
  duration: number
  @IsString()
  country: string
}
export class MovieDto {
  @IsString()
  poster: string

  @IsString()
  bigPoster: string

  @IsString()
  title: string

  @IsString()
  kinopoiskId: string

  @IsObject()
  parameters?: Parameters

  @IsString()
  slug: string
  @IsString()
  description: string

  @IsArray()
  @IsString({ each: true })
  genres: string[]

  @IsArray()
  @IsString({ each: true })
  actors: string[]
}
