import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';


describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [
        {
          id: 'user_id_1',
          username: 'user1',
          email: 'user1@example.com',
          role: 'user',
          rating: 0,
        },
      ];

      mockUsersService.findAll.mockResolvedValue(result);

      expect(await usersController.findAll()).toBe(result);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const userId = 'user_id_1';
      const result = {
        id: userId,
        username: 'user1',
        email: 'user1@example.com',
        role: 'user',
        rating: 0,
      };

      mockUsersService.findOne.mockResolvedValue(result);

      expect(await usersController.findOne(userId)).toBe(result);
      expect(usersService.findOne).toHaveBeenCalledWith(userId);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = 'user_id_1';
      const updateUserDto: UpdateUserDto = {
        username: 'updated_user',
        rating: 1500,
      };

      const result = {
        id: userId,
        username: 'updated_user',
        email: 'user1@example.com',
        role: 'user',
        rating: 1500,
      };

      mockUsersService.update.mockResolvedValue(result);

      expect(await usersController.update(userId, updateUserDto)).toBe(result);
      expect(usersService.update).toHaveBeenCalledWith(userId, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const userId = 'user_id_1';

      mockUsersService.remove.mockResolvedValue(undefined);

      await usersController.remove(userId);
      expect(usersService.remove).toHaveBeenCalledWith(userId);
    });
  });
});