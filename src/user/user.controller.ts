import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './dto/user-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDTO } from './dto/user-update.dto';
import { AuthService } from 'src/auth/auth.service';
import { Response, Request } from 'express';
import { PermissionGuard } from 'src/permission/permission.guard';

// this is to hide the password from entity in @Exclude
@UseGuards(PermissionGuard)
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  //update current authenticated user by cookie
  @Put('info')
  async updateInfo(@Body() body: UserUpdateDTO, @Req() request: Request) {
    console.log('update current authenticated user by cookie');
    const id = await this.authService.getAuthenticatedUserId(request);
    console.log(
      '🚀 ~ file: user.controller.ts ~ line 70 ~ UserController ~ id',
      id,
    );
    await this.userService.update(id, body);
    return this.userService.findOne({ id }, ['role']);
  }
  @Put('password')
  async updatePassword(
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
    @Req() request: Request,
  ) {
    if (password !== password_confirm) {
      throw new BadRequestException('Password do not match');
    }
    const hashed = await bcrypt.hash(password, 12);
    const id = await this.authService.getAuthenticatedUserId(request);
    await this.userService.update(id, {password:hashed});
    return this.userService.findOne({ id }, ['role']);
  }

  @Get()
  async all(@Query('page') page: number = 1) {
    return await this.userService.paginate(page, ['role']);
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {
    const password = await bcrypt.hash('1234', 12);

    const { role_id, ...data } = body;

    return this.userService.create({
      ...data,
      password,
      role: { id: role_id },
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userService.findOne({ id }, ['role']);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDTO) {
    const { role_id, ...data } = body;
    return this.userService.update(id, {
      ...data,
      role: { id: role_id },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
