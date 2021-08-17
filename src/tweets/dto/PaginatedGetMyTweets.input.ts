import { Field, InputType } from '@nestjs/graphql';
import { IPaginationInput } from 'src/core/interfaces/IPaginationInput';

@InputType()
export class PaginatedGetMyTweets implements IPaginationInput {
  @Field()
  skip: number;

  @Field()
  limit: number;
}
