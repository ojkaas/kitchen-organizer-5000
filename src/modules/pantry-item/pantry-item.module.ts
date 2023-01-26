import { Module } from '@nestjs/common';
import { GroceryItemService as PantryItemService } from './pantry-item.service';
import { PantryItemController } from './pantry-item.controller';

@Module({
  providers: [PantryItemService],
  controllers: [PantryItemController]
})
export class PantryItemModule { }
