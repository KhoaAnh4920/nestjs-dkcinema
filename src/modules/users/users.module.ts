import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from '../role/role.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule, RoleModule],
  controllers: [UsersController],
  providers: [UsersService, ConfigService],
  exports: [UsersModule, TypeOrmModule, UsersService],
})
export class UsersModule {}
