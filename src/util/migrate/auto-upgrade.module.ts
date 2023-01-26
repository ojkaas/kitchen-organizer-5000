import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [MikroOrmModule.forRoot()]
})
export class AutoUpgradeModule {
    private readonly logger = new Logger(AutoUpgradeModule.name);

    constructor(private mikroOrm: MikroORM, private config: ConfigService) {
        const autoUpgrade = config.get('AUTO_UPGRADE');
        if (autoUpgrade && Boolean(autoUpgrade)) {
            this.logger.log('AutoUpgradeModule: Executing database upgrade.');
            mikroOrm.getMigrator().up();
            return;
        }
    }
}
