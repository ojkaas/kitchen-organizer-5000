import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Bin } from './bin.entity';
import { BinResolver } from './bin.resolver';
import { BinService } from './bin.service';


@Module({
    imports: [MikroOrmModule.forFeature([Bin])],
    providers: [BinService, BinResolver]
})
export class BinModule { }
