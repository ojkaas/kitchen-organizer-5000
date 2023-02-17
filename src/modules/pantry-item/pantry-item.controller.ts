import { Body, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { NotFoundErrorFilter } from '../../core/dbase/not-found-error.interceptor';

import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { User } from '../user/user.entity';
import { ProductCategory } from './category/product-category.entity';
import { ProductCategoryService } from './category/product-category.service';
import { PantryItemDto } from './dto';
import { PantryItemDeleteDto } from './dto/pantry-item.delete';
import { PantryItemService } from './pantry-item.service';
import { ProductService } from './product/product.service';

@UseGuards(JwtGuard)
@Controller('pantryitems')
export class PantryItemController {
  constructor(private pantryitemsService: PantryItemService, private productService: ProductService, private productCategoryService: ProductCategoryService) { }

  @Get()
  async getPantryItems(@GetUser() user: User) {
    return this.pantryitemsService.findAll({ house: user.house });
  }

  @Get('/barcode/:barCode')
  async getPantryItemsByCategory(@Param() pantryItemDto: PantryItemDto) {
    return this.pantryitemsService.findProductByBarcode(pantryItemDto);
  }

  @Delete()
  @UseInterceptors(NotFoundErrorFilter)
  async deletePantryItem(@Body() pantryItemDeleteDto: PantryItemDeleteDto) {
    return await this.pantryitemsService.delete(instanceToPlain(pantryItemDeleteDto));
  }

  @Post()
  async postPantryItem(@GetUser() user: User, @Body() pantryItemDto: PantryItemDto) {
    let categories: ProductCategory[] = [];
    let product = pantryItemDto.product;
    let pantryItem = instanceToPlain(pantryItemDto);
    if (product && product.categories) {
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
    pantryItem.house = user.house.uuid;
    return await this.pantryitemsService.insert(pantryItem);
  }
}
