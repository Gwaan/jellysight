import { NestFactory } from '@nestjs/core';
import { ServerModule } from './server.module';
import { HttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
