import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const MergedUUIDParamAndBody = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return { ...req.body, uuid: req.params['uuid'] };
});