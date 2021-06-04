import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { UploadController } from './upload.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product]),
    CommonModule
  ],
  controllers: [ProductController,UploadController],
  providers: [ProductService]
})
export class ProductModule {}
