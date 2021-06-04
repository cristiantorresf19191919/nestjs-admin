import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { query } from 'express';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { OrderItem } from './models/order-item.entity';
import { OrderItemCreateDTO } from './models/OrderItemCreateDTO';
import { OrderItemServiceService } from './order-item-service.service';

@Controller('orderitems')
export class OrderItemController{

  constructor(private orderItemService:OrderItemServiceService){}  

    @Get()
    async all(@Query('page') page:number = 1){
        return this.orderItemService.paginate(page);
    }

    @Post()
    async create(@Body() body:OrderItemCreateDTO){
        const {order_id, ...orderItem} = body;
        return this.orderItemService.create({
            ...orderItem,
            order:{id:order_id}
        })
    }



   


}
