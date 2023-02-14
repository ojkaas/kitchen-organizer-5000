import { UuidType } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { BaseCrudService } from 'src/core/service/base.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { House } from './entities/house.entity';
import { Invite } from './submodules/entities/invite.entity';

@Injectable()
export class HouseService extends BaseCrudService<House> {

  constructor(@InjectRepository(House)
  private readonly houseRepository: EntityRepository<House>,
  private readonly entityManager: EntityManager) {
    super(houseRepository);
  }

  createDefault() {
    return this.houseRepository.create({ name: 'Default House' });
  }

  async invite(houseId: UuidType, email: string) {
    const house = await this.houseRepository.findOne({ uuid: houseId });

    const invite = new Invite();
    invite.email = email;
    invite.accepted = false;

    house.invites.add(invite);

    await this.entityManager.flush();
  }
}
