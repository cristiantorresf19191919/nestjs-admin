import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config';

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            inject: [config.KEY],
            useFactory:(configService:ConfigType<typeof config>)=>{
                const {database,host,password,port,username,type} = configService.mysql;
                return {
                   type:'mysql',
                   host,
                   port,
                   username,
                   password,
                   database,
                   autoLoadEntities:true,
                   synchronize:true
                }

            }
        })
    ]
})
export class DatabaseModule {}
