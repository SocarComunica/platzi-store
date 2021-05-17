import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dtos';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  findAll() {
    return this.orderModel.find().exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id);
  }

  create(data: CreateOrderDto) {
    const newModel = new this.orderModel(data);
    return newModel.save();
  }

  async update(id: string, changes: UpdateOrderDto) {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!order) throw new NotFoundException(`Order '${id}' not found`);
    return order;
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
}
