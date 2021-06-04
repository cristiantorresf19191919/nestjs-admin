import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  //toca importar el common module en los modulos donde se use este guardian  
  constructor(private jwtService: JwtService){}
  
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    try {
      const jwt = request.cookies['jwt'];
      console.log("🚀 ~ file: auth.guard.ts ~ line 14 ~ AuthGuard ~ canActivate ~ jwt", jwt)
      const isVerified = this.jwtService.verify(jwt);
      console.log("🚀 ~ file: auth.guard.ts ~ line 16 ~ AuthGuard ~ canActivate ~ isVerified", isVerified)
      const canGo  = isVerified && isVerified.id ? true : false;
      console.log("🚀 ~ file: auth.guard.ts ~ line 18 ~ AuthGuard ~ canActivate ~ canGo", canGo)
      
      return canGo;

    } catch (e) {
      return false;
    }
  }
}
