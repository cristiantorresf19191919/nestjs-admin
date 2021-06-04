import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UserModule } from 'src/user/user.module';
import { Role } from './models/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports:[
    forwardRef(()=> UserModule),
    TypeOrmModule.forFeature([Role]),
    AuthModule,
    
 
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports:[RoleService]
})
export class RoleModule {}
