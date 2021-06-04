import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductCreateDTO } from './product-create.dto';
import { ProductService } from './product.service';
import { UpdateProductDTO } from './update-product.dto';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {


    constructor(private productService: ProductService){}

    @Get()
    async all(@Query('page') page:number = 1){
        return this.productService.paginate(page)

    }

    @Post()
    async create(
        @Body() body:ProductCreateDTO
    ){
        return this.productService.create(body);
    }

    @Get('id')
    async get(@Param('id') id: number){
        return this.productService.findOne({id})
    }

    @Put('id')
    async update(@Param('id') id: number, @Body() body:UpdateProductDTO){
        await this.productService.update(id, body);
        return this.productService.findOne({id});
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        return this.productService.delete(id);
    }

}
