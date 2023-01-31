import { Controller, Get, Param, Query, Post, Body, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { PantryItemDto } from './dto';
import { PantryItem } from './pantry-item.entity';
import { PantryItemService } from './pantry-item.service';

@Controller('pantryitems')
export class PantryItemController {
  constructor(private pantryitemsService: PantryItemService) { }

  @Get()
  async getPantryItems() {
    return this.pantryitemsService.findAll();
    /*
    return this.pantryitemsService.findPantryItemsByCategory(categoryName);
    if (!category) {
      throw new NotFoundException(`Category ${categoryName} not found`);
    }
    const pantryItems = await this.pantryItemRepo.find({ categories: category });
    return pantryItems; */
  }

  @Get('/barcode/:barCode')
  async getPantryItemsByCategory(@Param() pantryItemDto: PantryItemDto) {
    return this.pantryitemsService.findProductByBarcode(pantryItemDto);
  }

  @Post()
  async postPantryItem(@Body() pantryItemDto: PantryItemDto) {
    return await this.pantryitemsService.insert(instanceToPlain(pantryItemDto));
  }
}
