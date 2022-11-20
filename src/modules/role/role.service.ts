import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { IRole } from './role.type';
import { AppError, ERROR_CODE } from '../shared/error';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  public async getRoleById(id: number): Promise<IRole> {
    const data = this.roleRepository
      .createQueryBuilder('role')
      .where('role.id = :id', { id })
      .getOne();
    if (!data) {
      throw new AppError(ERROR_CODE.ROLE_NOT_FOUND);
    }
    return data;
  }

  public async getRoleByCode(code: string): Promise<IRole> {
    const data = this.roleRepository
      .createQueryBuilder('role')
      .where('role.name = :code', { code })
      .getOne();
    if (!data) {
      throw new AppError(ERROR_CODE.ROLE_NOT_FOUND);
    }
    return data;
  }

  public async getListRole() {
    return await this.roleRepository.find();
  }
}
