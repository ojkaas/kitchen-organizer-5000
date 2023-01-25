import { Test, TestingModule } from '@nestjs/testing';
import { GroceryItemService } from './grocery-item.service';

describe('GroceryItemService', () => {
  let service: GroceryItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroceryItemService],
    }).compile();

    service = module.get<GroceryItemService>(GroceryItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
