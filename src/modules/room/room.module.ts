import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieTheaterModule } from '../movie-theater/movie-theater.module';
import { Seet } from '../seet/seet.entity';
import { RoomController } from './room.controller';
import { Room } from './room.entity';
import { RoomService } from './room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Seet]),
    ConfigModule,
    MovieTheaterModule,
  ],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService, RoomModule],
})
export class RoomModule {}
