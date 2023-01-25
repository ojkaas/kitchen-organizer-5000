import { Test, TestingModule } from '@nestjs/testing';
import { GroceryItemController } from './grocery-item.controller';

describe('GroceryItemController', () => {
  let controller: GroceryItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroceryItemController],
    }).compile();

    controller = module.get<GroceryItemController>(GroceryItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
