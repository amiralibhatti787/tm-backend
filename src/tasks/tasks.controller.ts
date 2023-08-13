import { Controller, Get, Post, Body, UseGuards, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create-task')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll() {
    const taskList = await this.tasksService.findAll();

    return { tasks: taskList };
  }
  @Delete('bulk-delete')
  async bulkDelete(@Body() taskIds: string[]) {
    const deleteResult = await this.tasksService.bulkDelete(taskIds);

    if (deleteResult.deletedCount) {
      return { message: `Deleted ${deleteResult.deletedCount} tasks` };
    }
    return { message: 'Something went wrong!' };
  }
}
