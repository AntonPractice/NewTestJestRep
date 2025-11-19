import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';

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
      const users = [{ _id: '1', username: 'user1' }, { _id: '2', username: 'user2' }];
      mockUsersService.findAll.mockResolvedValue(users);
      const result = await controller.findAll();
      expect(result).toHaveLength(2);
      //@ts-ignore
      expect(result[0]._id).toBe('1');
    });
  });

  describe('findOne', () => {
    it('should return single user', async () => {
      const user = { _id: '1', username: 'testuser' };
      mockUsersService.findOne.mockResolvedValue(user);
      const result = await controller.findOne('1');
      //@ts-ignore
      expect(result._id).toBe('1');
      expect(result.username).toBe('testuser');
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      const updatedUser = { _id: '1', username: 'updated' };
      mockUsersService.update.mockResolvedValue(updatedUser);
      const result = await controller.update('1', { username: 'updated' });
      expect(result.username).toBe('updated');
    });
  });

  describe('remove', () => {
    it('should delete user', async () => {
      const deletedUser = { _id: '1', username: 'deleted' };
      mockUsersService.remove.mockResolvedValue(deletedUser);
      const result = await controller.remove('1');
      //@ts-ignore
      expect(result._id).toBe('1');
    });
  });
});