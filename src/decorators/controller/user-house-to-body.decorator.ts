import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const BodyWithUserHouse = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return { ...req.body, house: req.user['house'] };
});