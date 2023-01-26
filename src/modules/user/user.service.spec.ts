import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.entity';
import { UserService } from './user.service';

let testUser = { name: "test", email: "test@gmail.com", language: "nl" };
let user = new User();
user.name = testUser.name;
user.email = testUser.email;
user.language = testUser.language;

describe('UserService', () => {
  let service: UserService;

  const mockedRepo = {
    create: jest.fn((name, email, language) => user)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {
        provide: getRepositoryToken(User),
        useValue: mockedRepo
      }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
