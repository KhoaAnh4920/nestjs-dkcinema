import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageMovieTheater, Movietheater } from './movie-theater.entity';
import {
  CreateMovieTheaterView,
  ICreateMovieTheaterViewReq,
} from './movie-theater.type';

@Injectable()
export class MovieTheaterService {
  constructor(
    @InjectRepository(Movietheater)
    private movieTheaterRepository: Repository<Movietheater>,

    @InjectRepository(ImageMovieTheater)
    private imageMovieTheaterRepository: Repository<ImageMovieTheater>,
  ) {}
  public async createNewMovieTheater(
    createMovieTheaterReq: ICreateMovieTheaterViewReq,
  ) {
    console.log('createMovieTheaterReq: ', createMovieTheaterReq);
    const movieTheater = new CreateMovieTheaterView(
      createMovieTheaterReq.name,
      createMovieTheaterReq.cityCode,
      createMovieTheaterReq.districtCode,
      createMovieTheaterReq.wardCode,
      createMovieTheaterReq.address,
      createMovieTheaterReq.phoneNumber,
    );
    try {
      const resMovieTheater = await this.movieTheaterRepository.save(
        movieTheater,
      );
      const result = [];
      for (let i = 0; i < createMovieTheaterReq.listImage.length; i++) {
        const obj = {
          movieTheater: resMovieTheater.id,
          url: createMovieTheaterReq.listImage[i].image,
          public_id: createMovieTheaterReq.listImage[i].public_id,
        };
        result.push(obj);
      }
      const resImages = await this.imageMovieTheaterRepository.save(result);
      return {
        ...resMovieTheater,
        listImage: resImages,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getListMovieTheater() {
    const result = await this.movieTheaterRepository
      .createQueryBuilder('ct')
      .innerJoinAndSelect('ct.items', 'images')
      .getMany();
    return result;
  }

  public async getDetailMovieTheater(id: number) {
    const result = await this.movieTheaterRepository
      .createQueryBuilder('ct')
      .innerJoinAndSelect('ct.items', 'images')
      .where('ct.id = :id', { id })
      .getOne();
    return result;
  }
}
