import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';
import { OtpModule } from '../otp/otp.module';
import { OtpService } from '../otp/otp.service';
import { RoleModule } from '../role/role.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    OtpModule,
    RoleModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService, ConfigService, OtpService],
  exports: [CustomerModule, TypeOrmModule, CustomerService],
})
export class CustomerModule {}
