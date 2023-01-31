import { FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { BaseCrudService } from 'src/core/service/base.service';
import { User } from '../user/user.entity';
import { PantryCategory } from './category/pantry-category.entity';
import { PantryItem } from './pantry-item.entity';

@Injectable()
export class PantryItemService extends BaseCrudService<PantryItem> {
    constructor(
        @InjectRepository(PantryItem) private pantryItemRepository: EntityRepository<PantryItem>, 
        @InjectRepository(PantryCategory) private pantryCategoryRepository: EntityRepository<PantryCategory>, 
        ) {
            super(pantryItemRepository);
         }

        /*
        findOne(query: FilterQuery<PantryItem>) {
            return this.pantryItemRepository.findOne(query);
        }    */
}
