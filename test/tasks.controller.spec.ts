import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../src/tasks/tasks.controller';
import { TasksService } from '../src/tasks/tasks.service';

// Добавьте этот интерфейс
interface MockTask {
  _id: string;
  title: string;
  description?: string;
  difficulty?: string;
  tags?: string[];
  examples?: any[];
  authorId?: string;
  authorRole?: string;
  rating?: number;
}

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
      // Arrange
      const tasks: MockTask[] = [
        { _id: '1', title: 'Task 1', difficulty: 'easy' },
        { _id: '2', title: 'Task 2', difficulty: 'medium' }
      ];
      mockTasksService.findAll.mockResolvedValue(tasks);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toHaveLength(2);
      expect((result as MockTask[])[0].title).toBe('Task 1');
    });
  });

  describe('findOne', () => {
    it('should return single task', async () => {
      // Arrange
      const task: MockTask = { _id: '1', title: 'Test Task', difficulty: 'hard' };
      mockTasksService.findOne.mockResolvedValue(task);

      // Act
      const result = await controller.findOne('1');

      // Assert
      expect((result as MockTask)._id).toBe('1'); // Приведение типа
      expect((result as MockTask).title).toBe('Test Task');
    });
  });

  describe('create', () => {
    it('should create task', async () => {
      // Arrange
      const newTask: MockTask = { 
        _id: '1', 
        title: 'New Task', 
        description: 'Desc',
        difficulty: 'easy'
      };
      mockTasksService.create.mockResolvedValue(newTask);

      // Act
      const result = await controller.create({
        title: 'New Task',
        description: 'Desc',
        difficulty: 'easy',
        authorId: '1',
        authorRole: 'admin'
      });

      // Assert
      expect((result as MockTask)._id).toBe('1'); // Приведение типа
      expect((result as MockTask).title).toBe('New Task');
    });
  });

  describe('update', () => {
    it('should update task', async () => {
      // Arrange
      const updatedTask: MockTask = { _id: '1', title: 'Updated Task' };
      mockTasksService.update.mockResolvedValue(updatedTask);

      // Act
      const result = await controller.update('1', { title: 'Updated Task' });

      // Assert
      expect((result as MockTask).title).toBe('Updated Task');
    });
  });

  describe('remove', () => {
    it('should delete task', async () => {
      // Arrange
      const deletedTask: MockTask = { _id: '1', title: 'Deleted Task' };
      mockTasksService.remove.mockResolvedValue(deletedTask);

      // Act
      const result = await controller.remove('1');

      // Assert
      expect((result as MockTask)._id).toBe('1'); // Приведение типа
    });
  });
});