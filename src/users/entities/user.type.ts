import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class UserType {
  @Field(() => ID)
  id: number;

  @Field()
  username: string;

  @Field()
  password: string;
}
