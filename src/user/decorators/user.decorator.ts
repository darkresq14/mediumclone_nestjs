import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.user) {
      return null;
    }

    if (data && typeof data === 'string') {
      return req.user[data];
    }

    return req.user;
  },
);
