import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  create(createTaskDto: CreateTaskDto) {
    return this.taskModel.create(createTaskDto);
  }

  findAll() {
    return this.taskModel.find();
  }
  async bulkDelete(taskIds: string[]): Promise<any> {
    try {
      const deleteResult = await this.taskModel.deleteMany({
        _id: { $in: taskIds },
      });

      if (deleteResult.deletedCount) {
        return deleteResult;
      }
      return false;
    } catch (error) {
      console.log('error', error.message);
      throw new BadRequestException('Failed to delete tasks.');
    }
  }
}
