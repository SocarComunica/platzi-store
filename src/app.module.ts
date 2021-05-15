import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { BrandsController } from './controllers/brands/brands.controller';
import { UsersController } from './controllers/users/users.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { ProductsService } from './services/products/products.service';
import { BrandsService } from './services/brands/brands.service';
import { CategoriesService } from './services/categories/categories.service';
import { OrdersService } from './services/orders/orders.service';
import { UsersService } from './services/users/users.service';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    BrandsController,
    CategoriesController,
    CustomersController,
    ProductsController,
    OrdersController,
    UsersController,
  ],
  providers: [
    AppService,
    BrandsService,
    CategoriesService,
    CustomersService,
    ProductsService,
    OrdersService,
    UsersService,
  ],
})
export class AppModule {}
