import { Controller, Get, Query } from '@nestjs/common';
import { PantryItemService } from './pantry-item.service';

@Controller('pantryitems')
export class PantryItemController { 
  constructor(private pantryitemsService: PantryItemService) {}

  @Get()
  async getPantryItemsByCategory(@Query('category') categoryName: string) {
    return this.pantryitemsService.findOne({ categories: categoryName });
    /*
    return this.pantryitemsService.findPantryItemsByCategory(categoryName);
    if (!category) {
      throw new NotFoundException(`Category ${categoryName} not found`);
    }
    const pantryItems = await this.pantryItemRepo.find({ categories: category });
    return pantryItems; */
  }
}
