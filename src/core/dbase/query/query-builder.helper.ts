import { UuidType } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";

export interface QueryDto {}

@Injectable()
export class QueryBuilderHelper {
    
   convertDto(dto: QueryDto) {
    return this.convertStringPropertiesToLike(dto);
   }

   convertStringPropertiesToLike(dto: QueryDto) {
        for (const key in dto) {
          if (typeof dto[key] === 'string' && !this.isUUID(dto[key])) {
            dto[key] = { $like: "%" + dto[key] + "%" };
          }
        }
        return dto;
    }

    isUUID (uuid: UuidType ) {
      let s = "" + uuid;
      const valid = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
      if (valid === null) {
        return false;
      }
      return true;
  }
}