import { EntityAssigner, EntityDTO, EntityManager, Loaded, NotFoundError, RequiredEntityData } from "@mikro-orm/core";
import { FindOneOptions } from "@mikro-orm/core/drivers";
import { EntityRepository } from "@mikro-orm/postgresql";
import { BaseModel } from "../entity/base.model";

export abstract class BaseCrudService<T extends BaseModel<T, 'uuid'>> {

    constructor(
        protected repository: EntityRepository<T>
    ) { }

    async findAll(filter = {}): Promise<Loaded<T>[]> {
        return await this.repository.findAll(filter);
    }


    async findOne(filter = {}, options?: FindOneOptions<T>): Promise<T> {
        return await this.repository.findOneOrFail(filter, options);
    }

    async delete(filter = {}): Promise<void> {
        return await this.repository.remove(await this.repository.findOneOrFail(filter)).flush();
    }

    async deleteByEntity(object: T): Promise<void> {
        return await this.repository.remove(object).flush();
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
        const result = await this.repository.upsert(entity);
        await this.repository.persistAndFlush(result);
        return result;
    }

    async update(entity: T, dto: Partial<EntityDTO<T>>): Promise<T> {
        EntityAssigner.assign(entity, dto);
        this.repository.flush();
        return entity;
    }

    async flush() {
        this.repository.flush()
    }
}
