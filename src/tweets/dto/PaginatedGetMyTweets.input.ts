import { Field, InputType } from '@nestjs/graphql';
import { IPaginationInput } from '../models/IPaginationInput';

@InputType()
export class PaginatedGetMyTweets implements IPaginationInput {
  @Field()
  skip: number;

  @Field()
  limit: number;
}
