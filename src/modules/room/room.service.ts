import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomViewReq, ICreateRoomViewReq } from './room.type';
import { Room } from './room.entity';
import { MovieTheaterService } from '../movie-theater/movie-theater.service';
import { AppError, ERROR_CODE } from '../shared/error';
import { Seet } from '../seet/seet.entity';
@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Seet)
    private seetRepository: Repository<Seet>,

    private readonly movieTheaterService: MovieTheaterService,
  ) {}
  public async createNewRoom(createRoomReq: ICreateRoomViewReq) {
    const checkTheater = await this.movieTheaterService.getDetailMovieTheater(
      createRoomReq.movieTheaterId,
    );
    if (!checkTheater) {
      throw new AppError(ERROR_CODE.THEATER_NOT_FOUND);
    }
    const room = new CreateRoomViewReq(
      createRoomReq.name,
      createRoomReq.numberOfColumn,
      createRoomReq.numberOfRow,
      checkTheater,
    );
    try {
      const resRoom = await this.roomRepository.save(room);
      const dataSeet = createRoomReq.seets;
      await Promise.all(
        dataSeet.map(async (item) => {
          await Promise.all(
            item.posOfColumn.map(async (y) => {
              const radCode = 'Seet ' + Math.round(Math.random() * 400);
              await this.seetRepository.save({
                codeSeet: radCode,
                posOfRow: item.posOfRow,
                posOfColumn: y.pos,
                typeSeet: y.typeId,
                room: resRoom,
              });
            }),
          );
        }),
      );
      return resRoom;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getRoomOfMovieTheater(movieTheaterId: number) {
    const checkTheater = await this.movieTheaterService.getDetailMovieTheater(
      movieTheaterId,
    );
    if (!checkTheater) {
      throw new AppError(ERROR_CODE.THEATER_NOT_FOUND);
    }
    const result = await this.roomRepository
      .createQueryBuilder('room')
      .where('room.movieTheater = :movieTheaterId', { movieTheaterId })
      .getMany();
    console.log('result: ', result);
    return result;
  }
}
