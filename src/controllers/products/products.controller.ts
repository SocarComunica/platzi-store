import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get('products')
    getProducts(
      @Query('limit') limit = 100,
      @Query('offset') offset = 0,
      @Query('brand') brand: string) {
      return `Products: limit = ${limit} products = ${offset} brand = ${brand}`
    }

    @Get('filter')
    getProductFilter() {
        return 'Yo soy un filter';
    }
  
    @Get('products/:id')
    getProduct(@Param('id') productId: string) {
      return `Product: ${productId}`
    }
}
