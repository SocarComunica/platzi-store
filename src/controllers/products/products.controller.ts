import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from 'src/services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  get() {
    return this.productsService.findAll();
  }

  @Get('filter')
  getFilter() {
    return 'Yo soy un filter';
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.delete(+id);
  }
}
