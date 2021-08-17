import { Field, ObjectType } from '@nestjs/graphql';
import { IPaginationResponse } from 'src/core/interfaces/IPaginationResponse';
import { TweetType } from '../../tweet.type';

@ObjectType()
export class GetMyTweetsPaginated implements IPaginationResponse<TweetType> {
  @Field()
  hasNext: boolean;

  @Field(() => [TweetType])
  data: TweetType[];
}
