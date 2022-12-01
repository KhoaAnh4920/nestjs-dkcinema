import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './common/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { RoleModule } from './modules/role/role.module';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CustomerService } from './modules/customer/customer.service';
import { CustomerModule } from './modules/customer/customer.module';
import { OtpModule } from './modules/otp/otp.module';
import { CacheModule } from './modules/shared/cache/cache.module';
import { MailModule } from './modules/mail/mail.module';
import { MovieTheaterModule } from './modules/movie-theater/movie-theater.module';
import { UploadModule } from './modules/upload/upload.module';
import { RoomModule } from './modules/room/room.module';
import { SeetModule } from './modules/seet/seet.module';
import { TypeSeetModule } from './modules/type-seet/type-seet.module';
import { ShowTimeModule } from './modules/show-time/show-time.module';
import { TicketModule } from './modules/ticket/ticket.module';

@Module({
  imports: [
    MorganModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        return {
          type: 'mysql',
          host: configService.get('db.host'),
          port: configService.get('db.port'),
          username: configService.get('db.user'),
          password: configService.get('db.password'),
          database: configService.get('db.name'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          migrations: ['src/migration/*{.ts,.js}'],
          synchronize: false,
          // logging: true,
        };
      },
    }),
    CacheModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const cacheOptions = configService.get('redis') || {};
        console.log('cacheOptions:', cacheOptions);
        return cacheOptions;
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    RoleModule,
    CustomerModule,
    OtpModule.forRoot(),
    MailModule,
    MovieTheaterModule,
    UploadModule,
    RoomModule,
    SeetModule,
    TypeSeetModule,
    ShowTimeModule,
    TicketModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
    CustomerService,
  ],
})
export class AppModule {}
