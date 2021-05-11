import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  newEndpoint() {
    return 'Yo soy nuevo';
  }
  
  @Get('/ruta/')
  hello() {
    return 'Con /sas/';
  }

  @Get('products/:id')
  getProduct(@Param('id') productId: string) {
    return `Product: ${productId}`
  }

  @Get('categories/:id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return `Category: ${id} Product: ${productId}`
  }
}
