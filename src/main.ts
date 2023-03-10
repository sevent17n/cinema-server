import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "http://1269893-cf00631.tw1.ru"
    }
  })
  app.setGlobalPrefix("api")
  app.enableCors()
  await app.listen(5000)
}
bootstrap()
