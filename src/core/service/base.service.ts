import { BaseEntity, EntityName, Loaded, PlainObject, Reference } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { AbstractSqlDriver, EntityManager, EntityRepository } from "@mikro-orm/postgresql";
import { BaseModel } from "../entity/base.model";

export abstract class BaseCrudService<T extends BaseModel<T,'uuid'>> {

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

    async insert(entity: T): Promise<T> {
        return this.repository.create(entity);
    }

    async updateOrInsert(entity: T): Promise<T> {
        return this.repository.upsert(entity);
    }
}
