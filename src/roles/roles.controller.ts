import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role-dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('roles')
export class RolesController {
  constructor (private readonly rolesService: RolesService) {}
  @Post()
  async createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @Get('/:value')
  async getRoleByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
