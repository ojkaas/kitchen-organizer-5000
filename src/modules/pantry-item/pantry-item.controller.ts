import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { NotFoundErrorFilter } from 'src/core/dbase/not-found-error.interceptor';
import { ProductCategory } from './category/product-category.entity';
import { ProductCategoryService } from './category/product-category.service';
import { PantryItemDto } from './dto';
import { PantryItemDeleteDto } from './dto/pantry-item.delete';
import { PantryItemService } from './pantry-item.service';
import { ProductService } from './product/product.service';

@Controller('pantryitems')
export class PantryItemController {
  constructor(private pantryitemsService: PantryItemService,private productService: ProductService, private productCategoryService: ProductCategoryService) { }

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
  
  @Delete()
  @UseInterceptors(NotFoundErrorFilter)
  async deletePantryItem(@Body() pantryItemDeleteDto: PantryItemDeleteDto) {
      await this.pantryitemsService.delete(instanceToPlain(pantryItemDeleteDto));
  }

  @Post()
  async postPantryItem(@Body() pantryItemDto: PantryItemDto) {
    let categories: ProductCategory[] = [];
    let product = pantryItemDto.product;
    let pantryItem = instanceToPlain(pantryItemDto);
    if(product && product.categories) {
      const insertAll = product.categories.map(async category => {
        const cat = await this.productCategoryService.updateOrInsert(instanceToPlain(category));
        categories.push(cat);
      });
      await Promise.all(insertAll);
      delete product.categories;
    }
    
    if (product) {
      const p = await (await this.productService.updateOrInsert(instanceToPlain(product))).init();
      p.categories.removeAll();
      p.categories.add(categories)
      pantryItem.product = p.toReference();
    } else {
      pantryItem.product = pantryItem.productReference;
    }

    return await this.pantryitemsService.insert(pantryItem);
  }
}
