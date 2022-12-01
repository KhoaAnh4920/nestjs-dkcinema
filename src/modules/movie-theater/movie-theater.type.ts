export interface ICreateMovieTheaterViewReq {
  name: string;
  cityCode: number;
  districtCode: number;
  wardCode: number;
  address: string;
  phoneNumber: string;
  listImage?: any;
}

export interface IMovieTheater {
  name: string;
  cityCode: number;
  districtCode: number;
  wardCode: number;
  address: string;
  phoneNumber: string;
}

export interface ICreateImagesMovieTheaterViewReq {
  movieTheater: IMovieTheater;
  status: boolean;
  url: string;
  puclic_id: string;
}

export class CreateMovieTheaterView implements ICreateMovieTheaterViewReq {
  constructor(
    readonly name: string,
    readonly cityCode: number,
    readonly districtCode: number,
    readonly wardCode: number,
    readonly address: string,
    readonly phoneNumber: string,
    readonly listImage?: any,
  ) {}
}
