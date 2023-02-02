import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../../../core/service/base.service';
import { ProductCategory } from './product-category.entity';

@Injectable()
export class ProductCategoryService extends BaseCrudService<ProductCategory> {

    constructor(
        @InjectRepository(ProductCategory) private productCategoryRepository: EntityRepository<ProductCategory>,
    ) {
        super(productCategoryRepository);
    }
}
