import { Module } from '@nestjs/common';
import { OpenFoodService } from './openfood.service';

@Module({
    providers: [OpenFoodService],
    exports: [OpenFoodService]
})
export class OpenFoodModule { }