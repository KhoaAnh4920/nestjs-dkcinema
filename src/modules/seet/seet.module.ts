import { Module } from '@nestjs/common';
import { SeetController } from './seet.controller';
import { SeetService } from './seet.service';

@Module({
  controllers: [SeetController],
  providers: [SeetService],
})
export class SeetModule {}
