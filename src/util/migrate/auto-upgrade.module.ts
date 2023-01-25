import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Logger, Module } from '@nestjs/common';

@Module({
    imports: [MikroOrmModule.forRoot()]
})
export class AutoUpgradeModule {
    private readonly logger = new Logger(AutoUpgradeModule.name);

    constructor(private readonly mikroOrm: MikroORM) {
        if (process.env.NODE_ENV !== 'development') {
            this.logger.log('AutoUpgradeModule: Executing database upgrade');
            mikroOrm.getMigrator().up();
            return;
        }
    }
}
