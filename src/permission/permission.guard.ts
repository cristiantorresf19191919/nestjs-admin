import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/role/models/role.entity';
import { RoleService } from 'src/role/role.service';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  
  //get the metadata from custom decorator
  constructor(
    private reflector: Reflector,
    private authService:AuthService,
    private userService:UserService,
    private roleService:RoleService
  ){

  }

  async canActivate(
    context: ExecutionContext,
  ) {
    //get the metadata from custom decorator
    const access = this.reflector.get<string>('access', context.getHandler());
    console.log("🚀 ~ file: permission.guard.ts ~ line 20 ~ PermissionGuard ~ access", access)
    if(!access) {return true}
    if(access == undefined) {return true}
    const request = context.switchToHttp().getRequest();

    const id = await this.authService.getAuthenticatedUserId(request);
    if (!id) return false;
    const user:User = await this.userService.findOne({id},['role']);

    const role:Role = await this.roleService.findOne({id:user.role.id},['permissions'])

    if (request.method === 'GET'){
      return role.permissions.some(p => (p.name === `view_${access}`) || (p.name === `edit_${access}`));
    }

    return role.permissions.some(p => p.name === access)

    
  }
}
