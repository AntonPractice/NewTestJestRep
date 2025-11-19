import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';

// Добавьте этот интерфейс
interface MockUser {
  _id: string;
  username: string;
  email?: string;
  role?: string;
  rating?: number;
}

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return users array', async () => {
      // Arrange
      const users: MockUser[] = [
        { _id: '1', username: 'user1' },
        { _id: '2', username: 'user2' }
      ];
      mockUsersService.findAll.mockResolvedValue(users);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toHaveLength(2);
      expect((result as MockUser[])[0]._id).toBe('1'); // Приведение типа
    });
  });

  describe('findOne', () => {
    it('should return single user', async () => {
      // Arrange
      const user: MockUser = { _id: '1', username: 'testuser' };
      mockUsersService.findOne.mockResolvedValue(user);

      // Act
      const result = await controller.findOne('1');

      // Assert
      expect((result as MockUser)._id).toBe('1'); // Приведение типа
      expect((result as MockUser).username).toBe('testuser');
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      // Arrange
      const updatedUser: MockUser = { _id: '1', username: 'updated' };
      mockUsersService.update.mockResolvedValue(updatedUser);

      // Act
      const result = await controller.update('1', { username: 'updated' });

      // Assert
      expect((result as MockUser).username).toBe('updated');
    });
  });

  describe('remove', () => {
    it('should delete user', async () => {
      // Arrange
      const deletedUser: MockUser = { _id: '1', username: 'deleted' };
      mockUsersService.remove.mockResolvedValue(deletedUser);

      // Act
      const result = await controller.remove('1');

      // Assert
      expect((result as MockUser)._id).toBe('1'); // Приведение типа
    });
  });
});