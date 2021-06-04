import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

//circular dependency problem use forwardRef

@Module({
  imports:[
    forwardRef(()=>UserModule),
    CommonModule 
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
