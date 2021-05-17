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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

import { ProductsService } from 'src/products/services/products.service';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dtos';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  async get(@Query() params: FilterProductsDto) {
    return await this.productsService.findAll(params);
  }

  @Get(':id')
  async getOne(@Param('id', MongoIdPipe) id: string) {
    return await this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateProductDto) {
    return await this.productsService.create(payload);
  }

  @Put(':id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return await this.productsService.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', MongoIdPipe) id: string) {
    return await this.productsService.delete(id);
  }
}
