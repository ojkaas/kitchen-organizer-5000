import { Options, FlushMode } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as path from 'path';

const config: Options = {
    type: 'postgresql',
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    metadataProvider: TsMorphMetadataProvider,
    migrations: {
        path: path.join(__dirname, './migrations'),
        emit: "ts",
        glob: '!(*.d).{js,ts}',
    },
    flushMode: FlushMode.AUTO
};

export default config;