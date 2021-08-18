import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('UserFollower')
export class FollowerType {
  @Field(() => ID)
  id: number;

  @Field()
  followerId: number;

  @Field()
  followedId: number;
}
