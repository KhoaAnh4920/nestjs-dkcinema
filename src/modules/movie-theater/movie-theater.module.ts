import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from '../role/role.module';
import { MovieTheaterController } from './movie-theater.controller';
import { ImageMovieTheater, Movietheater } from './movie-theater.entity';
import { MovieTheaterService } from './movie-theater.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movietheater, ImageMovieTheater]),
    ConfigModule,
    RoleModule,
  ],
  controllers: [MovieTheaterController],
  providers: [MovieTheaterService],
  exports: [MovieTheaterService, MovieTheaterModule],
})
export class MovieTheaterModule {}
