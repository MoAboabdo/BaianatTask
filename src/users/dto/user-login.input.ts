import { InputType,  Field } from '@nestjs/graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

@InputType({ description: ' InputLogin' })
export class UserLoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
