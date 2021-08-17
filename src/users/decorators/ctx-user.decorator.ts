import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CTxUser = createParamDecorator(
  (date, ctx) => GqlExecutionContext.create(ctx).getContext().req.user,
);
