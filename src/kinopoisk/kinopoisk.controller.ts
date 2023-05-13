import { Controller, Get, Param } from "@nestjs/common"
import { KinopoiskService } from "./kinopoisk.service"
import { Auth } from "../auth/decorators/auth.decorator"
import { IdValidationPipe } from "../pipes/id.validation.pipe"

//@Auth("admin")
@Controller("kinopoisk")
export class KinopoiskController {
  constructor(private readonly kinopoiskService: KinopoiskService) {}
  @Get("createMovie/:kinopoiskId")
  @Auth("admin")
  async getData(@Param("kinopoiskId") kinopoiskId: string) {
    return this.kinopoiskService.createMovieAccordingKinopoiskApi(kinopoiskId)
  }
}
