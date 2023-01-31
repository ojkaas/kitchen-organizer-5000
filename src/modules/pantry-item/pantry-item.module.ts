import { Module } from '@nestjs/common';
import { PantryItemService } from './pantry-item.service';
import { PantryItemController } from './pantry-item.controller';
import { PantryItem } from './pantry-item.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PantryCategory } from './category/pantry-category.entity';
import { OpenFoodModule } from '../openfood/openfood.module';

@Module({
  imports: [MikroOrmModule.forFeature([PantryItem]), MikroOrmModule.forFeature([PantryCategory]), OpenFoodModule],
  providers: [PantryItemService],
  controllers: [PantryItemController]
})
export class PantryItemModule { }
