import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './models/order.entity';
import { OrderItem } from './models/order-item.entity';
import { OrderItemController } from './order-item.controller';
import { OrderItemServiceService } from './order-item-service.service';


@Module({
  imports:[
    CommonModule,
    TypeOrmModule.forFeature([Order,OrderItem])
  ],
  providers: [OrderService, OrderItemServiceService],
  controllers: [OrderController, OrderItemController]
})
export class OrderModule {}
