import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ISingleRes } from '../shared/response';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginPayload } from './auth.dto';
import { IAuthResponse } from './auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public async login(@Body() credential: LoginPayload, @Res() res: Response) {
    const authRes = await this.authService.login(credential);
    const bodyResponse: ISingleRes<IAuthResponse> = {
      success: true,
      data: authRes,
    };

    return res.status(HttpStatus.OK).send(bodyResponse);
  }
}
