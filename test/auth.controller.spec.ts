import { TestingModule, Test } from "@nestjs/testing";
import { AuthController } from "../src/auth/auth.controller";
import { AuthService } from "../src/auth/auth.service";
import { CreateUserDto } from "../src/users/dto/create-user.dto";


describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const result = {
        token: 'jwt_token',
        user: {
          id: 'user_id',
          username: 'testuser',
          email: 'test@example.com',
          role: 'user',
        },
      };

      mockAuthService.register.mockResolvedValue(result);

      expect(await authController.register(createUserDto)).toBe(result);
      expect(authService.register).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('login', () => {
    it('should login user and return token', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = {
        token: 'jwt_token',
        user: {
          id: 'user_id',
          username: 'testuser',
          email: 'test@example.com',
          role: 'user',
        },
      };

      mockAuthService.login.mockResolvedValue(result);

      expect(await authController.login(loginDto)).toBe(result);
      expect(authService.login).toHaveBeenCalledWith(loginDto.email, loginDto.password);
    });
  });
});