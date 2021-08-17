import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserLoginInput } from './dto/user-login.input';
import { UserRegisterInput } from './dto/user-register.input';
import { UserType } from './entities/user.type';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserType)
  async register(
    @Args('registerInput') registerInput: UserRegisterInput,
  ): Promise<User> {
    return await this.usersService.register(registerInput);
  }

  @Mutation(() => UserType)
  async login(@Args('loginInput') loginInput: UserLoginInput): Promise<User> {
    return await this.usersService.login(loginInput);
  }

  // @Query(() => [User], { name: 'users' })
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.findOne(id);
  // }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.remove(id);
  // }
}
