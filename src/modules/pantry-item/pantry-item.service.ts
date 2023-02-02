import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { BaseCrudService } from '../../core/service/base.service';
import { OpenFoodService } from '../openfood/openfood.service';
import { PantryItemDto } from './dto';
import { ProductDto } from './dto/product.dto';
import { PantryItem } from './pantry-item.entity';

@Injectable()
export class PantryItemService extends BaseCrudService<PantryItem> {

    constructor(
        @InjectRepository(PantryItem) private pantryItemRepository: EntityRepository<PantryItem>,

        private openFoodService: OpenFoodService
    ) {
        super(pantryItemRepository);
    }

    async findProductByBarcode(productDto: ProductDto) {
        const pantryItem = await this.findOne({ barCode: productDto.barCode })

        if (!pantryItem) {
            console.log('Lookup product in openFoodService API');
            const product = await this.openFoodService.findProductByBarcode(productDto.barCode);
        }
        let pantryItemResponseDto = plainToClass(PantryItemDto, pantryItem);
        return pantryItemResponseDto;
    }

    /*
    async loadOpenFoodModule() {
        const { OpenFoodModule } = await import('../openfood/openfood.module');
        const moduleRef = await this.lazyModuleLoader.load(() => OpenFoodModule);

        const { OpenFoodService } = await import('../openfood/openfood.service');
        this.openFoodService = moduleRef.get(OpenFoodService);
        console.log("OpenFoodModule loaded");
    }*/

    /*
    findOne(query: FilterQuery<PantryItem>) {
        return this.pantryItemRepository.findOne(query);
    }    */
}
