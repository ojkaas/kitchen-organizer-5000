import { Test, TestingModule } from '@nestjs/testing';
import { PantryItemController } from './pantry-item.controller';

describe('PantryItemController', () => {
  let controller: PantryItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PantryItemController],
    }).compile();

    controller = module.get<PantryItemController>(PantryItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
