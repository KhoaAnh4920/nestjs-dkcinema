import { IMovieTheater } from '../movie-theater/movie-theater.type';

export interface IRoom {
  readonly id: number;
  readonly name: string;
  readonly numberOfColumn: number;
  readonly numberOfRow: number;
  readonly movieTheater: IMovieTheater;
}

export interface ICreateRoomViewReq {
  name: string;
  numberOfColumn: number;
  numberOfRow: number;
  movieTheaterId?: number;
  seets?: any;
}

export class CreateRoomViewReq implements ICreateRoomViewReq {
  constructor(
    readonly name: string,
    readonly numberOfColumn: number,
    readonly numberOfRow: number,
    readonly movieTheater: IMovieTheater,
    readonly seets?: any,
  ) {}
}
