import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';
import { RoleService } from './role.service';
import { RoleResponse } from './role.type';
import { RolePresenter } from './role.presenter';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiTags('Role')
  @Get('/:id')
  @ApiOperation({ summary: 'Get role' })
  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  @ApiCreatedResponse({
    status: 200,
    description: 'Get role by id',
    type: RoleResponse,
  })
  async getRoleById(@Param('id') id: number): Promise<RoleResponse> {
    const role = await this.roleService.getRoleById(id);
    return RolePresenter.formatRoleResponse(role);
  }

  async getRoleByCode(@Param('code') code: string): Promise<RoleResponse> {
    const role = await this.roleService.getRoleByCode(code);
    return RolePresenter.formatRoleResponse(role);
  }

  @ApiTags('Role')
  @Get('/')
  @ApiOperation({ summary: 'Get list role' })
  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  async getListRole() {
    const role = await this.roleService.getListRole();
    return {
      statusCode: HttpStatus.OK,
      message: 'Role fetched successfully',
      role,
    };
  }
}
