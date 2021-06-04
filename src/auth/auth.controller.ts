import { BadRequestException, Body, Controller, Get, NotFoundException, Post,Res,Req, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDTO } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import {Response, Request} from 'express'
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';


@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(
      private userService: UserService,
      private jwtService: JwtService,
      private authService: AuthService
      ) {}

  @Post('register')
  async register(@Body() userDTO:RegisterDTO) {
    const hashed = await bcrypt.hash(userDTO.password, 12);

    const found = await this.userService.findOne({email:userDTO.email});

    if (found) throw new BadRequestException('Email duplicated');

    if (userDTO.password !== userDTO.password_confirm){
        throw new BadRequestException('Password do not match')
    }
    return this.userService.create({
      first_name: userDTO.first_name,
      last_name: userDTO.last_name,
      email: userDTO.email,
      password: hashed,
      role:{id:2}
    });
  }

  @Post('login')
  async login(
      @Body('email') email: string,
      @Body('password') password:string,
      @Res({passthrough:true}) response: Response
  ){
      const user = await this.userService.findOne({email});
      if(!user) throw new NotFoundException('User not found')

      if(! await bcrypt.compare(password, user.password)){
        throw new BadRequestException('Invalid credentials')
      }

      const jwt = await this.jwtService.signAsync({id: user.id})
      //http jwt only cookies
      //can only be sent by the frontend security
      response.cookie('jwt',jwt,{httpOnly:true});
      return user;
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async user(@Req() request: Request){
      const id = await this.authService.getAuthenticatedUserId(request);
      return this.userService.findOne({id})
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res({passthrough: true}) response:Response){
    response.clearCookie('jwt');
    return {
      message:'Success'
    }
  }

}
