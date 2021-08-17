import { InputType, Int, Field } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType({ description: ' Create Tweet ' })
export class CreateTweetInput {
  [x: string]: any;
  @Field()
  @MinLength(1)
  @MaxLength(255)
  content: string;
}
