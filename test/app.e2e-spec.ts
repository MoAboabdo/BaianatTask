import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersResolver } from '../src/users/users.resolver';
import { UsersService } from 'src/users/users.service';
import { UserRegisterInput } from 'src/users/dto/user-register.input';

let resolver: UsersResolver;
let userMockservice: UsersService;

let registerDto = new UserRegisterInput();
(registerDto.email = 'devmoaboabdo'), (registerDto.password = '123456789');
const usersService = {
  register: jest.fn((users) => {
    return {
      id: 'fake-user-id',
      ...registerDto,
    };
  }),
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile();

    resolver = moduleFixture.get<UsersResolver>(UsersResolver);
    userMockservice = moduleFixture.get<UsersService>(UsersService);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should have register function', () => {
    expect(resolver.register).toBeDefined();
  });

  it('should register user and return with id', () => {
    expect(resolver.register(registerDto)).toEqual({
      id: 'fake-user-id',
      ...registerDto,
    });
    expect(userMockservice.register).toBeCalled();
  });
});
