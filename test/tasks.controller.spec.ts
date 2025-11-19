import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { TasksController } from 'src/tasks/tasks.controller';
import { TasksService } from 'src/tasks/tasks.service';


describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

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
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = [
        {
          id: 'task_id_1',
          title: 'Two Sum',
          description: 'Given an array...',
          difficulty: 'easy',
          tags: ['array'],
          authorId: { username: 'user1' },
          authorRole: 'user',
          rating: 4.5,
        },
      ];

      mockTasksService.findAll.mockResolvedValue(result);

      expect(await tasksController.findAll()).toBe(result);
      expect(tasksService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      const taskId = 'task_id_1';
      const result = {
        id: taskId,
        title: 'Two Sum',
        description: 'Given an array...',
        difficulty: 'easy',
        tags: ['array'],
        authorId: { username: 'user1' },
        authorRole: 'user',
        rating: 4.5,
      };

      mockTasksService.findOne.mockResolvedValue(result);

      expect(await tasksController.findOne(taskId)).toBe(result);
      expect(tasksService.findOne).toHaveBeenCalledWith(taskId);
    });
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'Task description',
        difficulty: 'medium',
        tags: ['array', 'hash'],
        authorId: 'user_id_1',
        authorRole: 'user',
        rating: 0,
      };

      const result = {
        id: 'task_id_2',
        ...createTaskDto,
        authorId: { username: 'user1' },
        createdAt: new Date(),
      };

      mockTasksService.create.mockResolvedValue(result);

      expect(await tasksController.create(createTaskDto)).toBe(result);
      expect(tasksService.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const taskId = 'task_id_1';
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        rating: 5.0,
      };

      const result = {
        id: taskId,
        title: 'Updated Task',
        description: 'Task description',
        difficulty: 'easy',
        tags: ['array'],
        authorId: { username: 'user1' },
        authorRole: 'user',
        rating: 5.0,
      };

      mockTasksService.update.mockResolvedValue(result);

      expect(await tasksController.update(taskId, updateTaskDto)).toBe(result);
      expect(tasksService.update).toHaveBeenCalledWith(taskId, updateTaskDto);
    });
  });

  describe('remove', () => {
    it('should delete a task', async () => {
      const taskId = 'task_id_1';

      mockTasksService.remove.mockResolvedValue(undefined);

      await tasksController.remove(taskId);
      expect(tasksService.remove).toHaveBeenCalledWith(taskId);
    });
  });
});