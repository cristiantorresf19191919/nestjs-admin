import { BadRequestException, Injectable, ForbiddenException } from '@nestjs/common';
import {Response, Request} from 'express'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(      
        private jwtService: JwtService
        ) {}


    async getAuthenticatedUserId(request:Request):Promise<number>{
        console.log('getAuthenticatedUserId')
     const cookie = request.cookies['jwt'];
     console.log("🚀 ~ file: auth.service.ts ~ line 16 ~ AuthService ~ getAuthenticatedUserId ~ cookie", cookie)
     try {
         if(!cookie) throw new BadRequestException("Unauthenticated")
         
          const data = await this.jwtService.verifyAsync(cookie);
          console.log("🚀 ~ file: auth.service.ts ~ line 18 ~ AuthService ~ getAuthenticatedUserId ~ data", data)
          
          return data['id'];
         
     } catch (error) {
         throw new ForbiddenException(JSON.stringify(error['message']));         
     }
    }
}
