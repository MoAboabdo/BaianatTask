import { InputType, Field } from '@nestjs/graphql';

@InputType({ description: 'Follow User' })
export class CreateFollowerInput {
  @Field()
  followed_Id: number;
}
