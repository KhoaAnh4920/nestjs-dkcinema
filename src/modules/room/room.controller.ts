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
import { AdminCreateRoomDto, FindOneByMovileTheaterId } from './room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService, //private readonly otpService: OtpService,
  ) {}

  @ApiTags('Room')
  @Post()
  @ApiOperation({ summary: 'Create new room' })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  public async adminCreateRoom(
    @Body() body: AdminCreateRoomDto,
    @Res() res: Response,
  ) {
    const resRoom = await this.roomService.createNewRoom(body);
    return res.status(HttpStatus.CREATED).send({
      success: true,
      data: resRoom,
    });
  }

  @ApiTags('Room')
  @Get('/theater/:movieTheaterId')
  @ApiOperation({ summary: 'Get list room' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  public async getRoomOfMovileTheater(
    @Res() res: Response,
    @Param() params: FindOneByMovileTheaterId,
  ) {
    console.log(params.movieTheaterId);
    const resRoom = await this.roomService.getRoomOfMovieTheater(
      params.movieTheaterId,
    );
    return res.status(HttpStatus.OK).send({
      success: true,
      data: resRoom,
    });
  }
}
