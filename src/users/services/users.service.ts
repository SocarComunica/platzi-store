import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'src/users/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dtos';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<typeof User>,
    private productsService: ProductsService,
  ) {}

  async findAll() {
    return await this.userModel.find().exec();
  }

  findOne(id: string) {
    const user = this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException();
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = new this.userModel(data);
    return await newUser.save();
  }

  async update(id: string, changes: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();

    if (!user) throw new NotFoundException(`Brand '${id}' not found`);

    return user;
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndRemove(id);
  }

  async getOrdersByUser(id: string) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
