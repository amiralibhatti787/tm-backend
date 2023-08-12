import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(registerUserDto: RegisterUserDto) {
    try {
      const saltRounds = 10; // You can adjust this value based on your security requirements
      const hashedPassword = await bcrypt.hash(
        registerUserDto.password,
        saltRounds,
      );

      const user = await this.userModel.create({
        email: registerUserDto.email,
        password: hashedPassword,
      });

      const { password, ...userWithoutPassword }: any = user.toObject();

      return { user: userWithoutPassword };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already taken');
      }
      throw new BadRequestException('Something went wrong!');
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user: User = await this.userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async getUser(id: string) {
    try {
      const user: User = await this.userModel.findOne({ _id: id }).lean();

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      delete user.password;

      return user;
    } catch (error) {
      throw error; // Rethrow the error if any other issue occurs during retrieval
    }
  }
}
