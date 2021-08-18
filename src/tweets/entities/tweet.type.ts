import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Tweet')
export class TweetType {
  @Field(() => ID)
  id: number;

  @Field()
  content: string;
}
