import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";
import { BinService } from "./bin.service";
import { Bin } from "./bin.entity";

@Resolver(() => Bin)
export class BinResolver {
    constructor(private binService: BinService) { }

    //Queries
    @Query(() => String)
    getStuff(): string {
        return 'This is working';
    }

    //Mutations
    @Mutation(() => Bin)
    createUser(
        @Args('name') name: string,
    ) {
        return this.binService.createBin(name);
    }
}