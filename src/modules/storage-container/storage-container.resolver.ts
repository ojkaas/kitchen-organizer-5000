import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";
import { StorageContainerService } from "./storage-container.service";
import { StorageContainer } from "./storage-container.entity";

@Resolver(() => StorageContainer)
export class StorageContainerResolver {
    constructor(private scService: StorageContainerService) { }

    //Queries
    @Query(() => String)
    getStuff(): string {
        return 'This is working';
    }

    //Mutations
    @Mutation(() => StorageContainer)
    createStorageContainer(
        @Args('name') name: string,
    ) {
        return this.scService.createStorageContainer(name);
    }
}