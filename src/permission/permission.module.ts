import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';
import { Permission } from './models/permission.entity';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Permission]),
    AuthModule,
    UserModule,
    RoleModule
  ],
  controllers: [PermissionController],
  providers: [PermissionService]
})
export class PermissionModule {}
