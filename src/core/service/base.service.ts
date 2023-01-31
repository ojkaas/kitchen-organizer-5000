import { Loaded, RequiredEntityData } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { BaseModel } from "../entity/base.model";

export abstract class BaseCrudService<T extends BaseModel<T, 'uuid'>> {

    constructor(
        protected repository: EntityRepository<T>
    ) { }

    async findAll(filter = {}): Promise<Loaded<T>[]> {
        return this.repository.findAll(filter);
    }

    async findOne(filter = {}): Promise<T> {
        return this.repository.findOne(filter);
    }

    /*
    async findByUUID(uuid: string): Promise<Loaded<T, never>> {
        return this.repository.findOne(uuid);
    }*/

    async delete(entity: T): Promise<void> {
        return this.repository.remove(entity).flush();
    }

    /*
    async update(dto: T): Promise<T> {
        return this.em.getReference(dto ,dto.uuid);
    }*/

    async insert(entity: RequiredEntityData<T>): Promise<T> {
        const result = this.repository.create(entity);
        await this.repository.persistAndFlush(result);
        return result;
    }

    async updateOrInsert(entity: RequiredEntityData<T>): Promise<T> {
        const result = this.repository.upsert(entity);
        await this.repository.persistAndFlush(result);
        return result;
    }
}
