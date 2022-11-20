import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService: ConfigService = app.get(ConfigService);
  const { host, port } = configService.get<{ host: string; port: number }>(
    'server',
    { host: '0.0.0.0', port: 8080 },
  );
  const env = configService.get('NODE_ENV');

  if (env !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('DKCINEMA')
      .setDescription(`The DKCINEMA API description`)
      .setVersion('0.0.1')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  if (env === 'dev') {
    app.enableCors({ origin: '*' });
  }

  await app.listen(port, host);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
