import { Body, Controller, Get, Query, Post, Delete, Param, ClassSerializerInterceptor, UseInterceptors, Put, Res } from '@nestjs/common';
import { Order } from './models/order.entity';
import { OrderCreateDTO } from './models/OrderCreateDTO';
import { OrderService } from './order.service';
import { Response, Request } from 'express';
import {Parser} from 'json2csv'
import { OrderItem } from './models/order-item.entity';
import { HasPermission } from 'src/permission/decorators/has-permission.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class OrderController {

    constructor(private orderService:OrderService){}

    @Get('orders/chart')
    async chart(){
        return await this.orderService.chart();        
    }

    @Get('orders')
    async all(@Query('page') page:number = 1) {
        return this.orderService.paginate(page,['order_items']);
    }

    @Get('orders/:id')
    async get(@Param('id') id:number =1){
        return await this.orderService.findOne({id},['order_items']);
    }

    @Post('orders')
    async create(@Body() body:OrderCreateDTO){
        return this.orderService.create(body);        
    }

    @Put('orders/:id')
    async update(@Param('id') id:number, @Body() body:OrderCreateDTO){
        return await this.orderService.update(id,body);
    }

    @Delete('orders/:id')
    async deleteOrder(@Param('id') id:number){
        return this.orderService.delete(id);
    }

  
    @Post('orders/export')
    async export(@Res() res: Response){
        const parser = new Parser({
            fields:['ID','Name','Email','Product Title','Price','Quantity']
        });
        const orders = await this.orderService.all(['order_items'])
        const json = [];
        orders.forEach((o:Order) => {
            json.push({
                ID:o.id,
                Name:o.first_name,
                Email:o.email,
                'Product Title':'',
                Price:'',
                Quantity:''                

            })

            o.order_items.forEach((i:OrderItem) => {
                json.push({
                    ID:'',
                    Name:'',
                    Email:'',
                    'Product Title':i.product_title,
                    Price:i.price,
                    Quantity:i.quantity

                })
            })
            
        })

        const csv = parser.parse(json);
        res.header('Content-Type','test/csv');
        res.attachment('orders.csv');
        return res.send(csv)
        
    }


}
