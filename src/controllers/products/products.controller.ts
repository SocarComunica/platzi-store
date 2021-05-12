import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('products')
  get(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `Products: limit = ${limit} products = ${offset} brand = ${brand}`;
  }

  @Get('filter')
  getFilter() {
    return 'Yo soy un filter';
  }

  @Get('products/:id')
  getOne(@Param('id') productId: string) {
    return `Product: ${productId}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Acción de crear',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return id;
  }
}
