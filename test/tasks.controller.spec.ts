import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../src/tasks/tasks.controller';
import { TasksService } from '../src/tasks/tasks.service';

describe('TasksController', () => {
  let controller: TasksController;

  const mockTasksService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: mockTasksService }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  describe('findAll', () => {
    it('should return tasks array', async () => {
      const tasks = [
        { _id: '1', title: 'Task 1', difficulty: 'easy' },
        { _id: '2', title: 'Task 2', difficulty: 'medium' }
      ];
      mockTasksService.findAll.mockResolvedValue(tasks);

      const result = await controller.findAll();

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Task 1');
    });
  });

  describe('findOne', () => {
    it('should return single task', async () => {
      const task = { _id: '1', title: 'Test Task', difficulty: 'hard' };
      mockTasksService.findOne.mockResolvedValue(task);
      const result = await controller.findOne('1');

      //@ts-ignore
      expect(result._id).toBe('1');
      expect(result.title).toBe('Test Task');
    });
  });

  describe('create', () => {
    it('should create task', async () => {
      const newTask = { 
        _id: '1', 
        title: 'New Task', 
        description: 'Desc',
        difficulty: 'easy'
      };
      mockTasksService.create.mockResolvedValue(newTask);

      const result = await controller.create({
        title: 'New Task',
        description: 'Desc',
        difficulty: 'easy',
        authorId: '1',
        authorRole: 'admin'
      });

      //@ts-ignore
      expect(result._id).toBe('1');
      expect(result.title).toBe('New Task');
    });
  });

  describe('update', () => {
    it('should update task', async () => {
      // Arrange
      const updatedTask = { _id: '1', title: 'Updated Task' };
      mockTasksService.update.mockResolvedValue(updatedTask);
      const result = await controller.update('1', { title: 'Updated Task' });
      expect(result.title).toBe('Updated Task');
    });
  });

  describe('remove', () => {
    it('should delete task', async () => {
      const deletedTask = { _id: '1', title: 'Deleted Task' };
      mockTasksService.remove.mockResolvedValue(deletedTask);
      const result = await controller.remove('1');
      //@ts-ignore
      expect(result._id).toBe('1');
    });
  });
});