import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { StorageContainer } from './storage-container.entity';
import { StorageContainerService } from './storage-container.service';

let testSC = { name: "test" };
let sc = new StorageContainer();
sc.name = testSC.name;


describe('StorageContainerService', () => {
  let service: StorageContainerService;

  const mockedRepo = {
    create: jest.fn((name) => sc)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageContainerService, {
        provide: getRepositoryToken(StorageContainer),
        useValue: mockedRepo
      }],
    }).compile();

    service = module.get<StorageContainerService>(StorageContainerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
