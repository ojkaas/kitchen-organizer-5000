import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
    constructor(private _userService: UserService) { }

    //Queries
    @Query(() => String)
    getStuff(): string {
        return 'This is working';
    }

    //Mutations
    @Mutation(() => User)
    createUser(
        @Args('name') name: string,
        @Args('email') email: string,
        @Args('language') language: string,
    ) {
        return this._userService.createUser(name, email, language);
    }
}