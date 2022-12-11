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
import { Response } from 'express';
import { MovieService } from './movie.service';
import { AdminCreateMovieDto } from './movie.dto';

@Controller('movie')
export class MovieController {
    constructor(
        private readonly movieService: MovieService, //private readonly otpService: OtpService,
      ) {}
      @ApiTags('Movie')
      @Post()
      @ApiOperation({ summary: 'Create new Movie' })
      @ApiResponse({
        status: HttpStatus.CREATED,
      })
      public async adminCreateMovie(
        @Body() body: AdminCreateMovieDto,
        @Res() res: Response,
      ) {
        // const resMovie = await this.movieService.createNewMovie(body);
        return res.status(HttpStatus.CREATED).send({
          success: true,
          data: [],
        });
      }
}
