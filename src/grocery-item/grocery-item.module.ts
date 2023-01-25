import { Module } from '@nestjs/common';
import { GroceryItemService } from './grocery-item.service';
import { GroceryItemController } from './grocery-item.controller';

@Module({
  providers: [GroceryItemService],
  controllers: [GroceryItemController]
})
export class GroceryItemModule { }
