import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/auth.schemas';
import { UserAuthenticationSchema } from './dto/base-user.dto';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: UserAuthenticationSchema): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    return this.userModel.findOne({ email, password }).exec();
  }
}
