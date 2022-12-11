import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminCreateMovieTheaterDto } from './movie-theater.dto';
import { MovieTheaterService } from './movie-theater.service';
import { Response } from 'express';
import { FindOneById } from '../shared/shared.dto';

@Controller('movie-theater')
export class MovieTheaterController {
  constructor(
    private readonly movieTheaterService: MovieTheaterService, //private readonly otpService: OtpService,
  ) {}

  @ApiTags('Movie-theater')
  @Post()
  @ApiOperation({ summary: 'Create Movie theater' })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  public async adminCreateMovieTheater(
    @Body() body: AdminCreateMovieTheaterDto,
    @Res() res: Response,
  ) {
    const resMovie = await this.movieTheaterService.createNewMovieTheater(body);
    return res.status(HttpStatus.CREATED).send({
      success: true,
      data: resMovie,
    });
  }

  @ApiTags('Movie-theater')
  @Get()
  @ApiOperation({ summary: 'Get list Movie theater' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  public async getListMovileTheater(@Res() res: Response) {
    console.log('OK');
    const resMovieTheater =
      await this.movieTheaterService.getListMovieTheater();
    return res.status(HttpStatus.OK).send({
      success: true,
      data: resMovieTheater,
    });
  }

  @ApiTags('Movie-theater')
  @Get('/detail/:id')
  @ApiOperation({ summary: 'Get detail Movie theater' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  public async getDetailMovileTheater(
    @Res() res: Response,
    @Param() params: FindOneById,
  ) {
    const resMovieTheater =
      await this.movieTheaterService.getDetailMovieTheater(params.id);
    return res.status(HttpStatus.OK).send({
      success: true,
      data: resMovieTheater,
    });
  }
}
