import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/schemas/user.schema';

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: any;
  let jwtService: JwtService;

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const hashedPassword = 'hashed_password';
      const user = {
        _id: 'user_id',
        ...createUserDto,
        password: hashedPassword,
        role: 'user',
        toObject: jest.fn().mockReturnValue({
          _id: 'user_id',
          ...createUserDto,
          password: hashedPassword,
          role: 'user',
        }),
      };

      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);
      userModel.findOne.mockResolvedValue(null);
      userModel.create.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue('jwt_token');

      const result = await authService.register(createUserDto);

      expect(result.token).toBe('jwt_token');
      expect(result.user).toHaveProperty('id', 'user_id');
      expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(userModel.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: hashedPassword,
        role: 'user',
        rating: 0,
      });
    });
  });
});