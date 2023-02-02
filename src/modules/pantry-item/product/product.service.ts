import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../../../core/service/base.service';
import { Product } from './product.entity';

@Injectable()
export class ProductService extends BaseCrudService<Product> {

    constructor(
        @InjectRepository(Product) private productRepository: EntityRepository<Product>,
    ) {
        super(productRepository);
    }
}
