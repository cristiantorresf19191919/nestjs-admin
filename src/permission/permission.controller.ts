import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { HasPermission } from './decorators/has-permission.decorator';
import { PermissionGuard } from './permission.guard';
import { PermissionService } from './permission.service';


@UseGuards(PermissionGuard)
@Controller('permission')
export class PermissionController {
    constructor(private permissionService:PermissionService){}
    
    @Get()
    @HasPermission('view_permissions')
    async all(){
        return this.permissionService.all();
    }
}
