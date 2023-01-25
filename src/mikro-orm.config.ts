import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as path from 'path';

const config: Options = {
    type: 'postgresql',
    host: 'localhost',
    port: 5432,
    user: 'root',
    password: 'root',
    dbName: 'test_db',
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    metadataProvider: TsMorphMetadataProvider,
    migrations: {
        path: path.join(__dirname, './migrations'),
        emit: "ts",
        glob: '!(*.d).{js,ts}',
    }
};

export default config;