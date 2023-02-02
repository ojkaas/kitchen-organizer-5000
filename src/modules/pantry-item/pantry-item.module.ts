import { Module } from '@nestjs/common';
import { PantryItemService } from './pantry-item.service';
import { PantryItemController } from './pantry-item.controller';
import { PantryItem } from './pantry-item.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OpenFoodModule } from '../openfood/openfood.module';
import { ProductService } from './product/product.service';
import { Product } from './product/product.entity';
import { ProductCategoryService } from './category/product-category.service';
import { ProductCategory } from './category/product-category.entity';

@Module({
  imports: [MikroOrmModule.forFeature([PantryItem]),MikroOrmModule.forFeature([Product]),MikroOrmModule.forFeature([ProductCategory]), OpenFoodModule],
  providers: [PantryItemService,ProductService,ProductCategoryService],
  controllers: [PantryItemController]
})
export class PantryItemModule { }
