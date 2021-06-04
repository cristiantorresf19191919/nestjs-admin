import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { Permission } from 'src/permission/models/permission.entity';
import { PermissionGuard } from 'src/permission/permission.guard';
import { RoleService } from './role.service';

@UseGuards(PermissionGuard)
@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async all() {
    return this.roleService.all();
  }

  @Post()
  async create(
      @Body('name') name:string,
      @Body('permissions') idList:number[]
      ){
    return this.roleService.create({
        name,
        permissions:idList.map(id => ({id}))
    })    
  }

  @Get(':id')
  async get(@Param('id') id: number){
    return this.roleService.findOne({id},['permissions']);
  }

  @Put(':id')
  async update(
      @Param('id') id: number,
      @Body('name') name: string,
      @Body('permissions') idList:number[]
      ){
        return await this.roleService.updateRol(id, {
            name, permissions:idList.map(id => ({id}))            
        });                   
      }

  @Delete(':id')
  async delete(@Param('id') id: number){
    return this.roleService.delete(id);
  }


}
