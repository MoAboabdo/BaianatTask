import { Field, ObjectType } from '@nestjs/graphql';
import { IPaginationResponse } from '../models/IPaginationResponse';
import { TweetType } from '../entities/tweet.type';

@ObjectType()
export class GetMyTweetsPaginated implements IPaginationResponse<TweetType> {
  @Field()
  hasNext: boolean;

  @Field(() => [TweetType])
  data: TweetType[];
}
