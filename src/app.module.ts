import { HttpModule, HttpService,Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as Joi from 'joi';

import config from './config';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './environments';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AbstractService } from './common/abstract.service';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { APP_GUARD } from '@nestjs/core';
import { PermissionGuard } from './permission/permission.guard';


@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number(),
        DATABASE_NAME: Joi.string(),
        DATABASE_PORT: Joi.number(),
      }),
    }),
    HttpModule,  
    DatabaseModule, AuthModule, CommonModule, RoleModule, PermissionModule, ProductModule, OrderModule
  
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionGuard
    }
  ],
})
export class AppModule {}
