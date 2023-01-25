import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { Bin } from './bin.entity';
import { BinService } from './bin.service';

let testBin = { name: "test" };
let bin = new Bin();
bin.name = testBin.name;


describe('BinService', () => {
  let service: BinService;

  const mockedRepo = {
    create: jest.fn((name) => bin)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BinService, {
        provide: getRepositoryToken(Bin),
        useValue: mockedRepo
      }],
    }).compile();

    service = module.get<BinService>(BinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
