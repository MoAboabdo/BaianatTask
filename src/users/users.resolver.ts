import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserLoginInput } from './dto/user-login.input';
import { UserRegisterInput } from './dto/user-register.input';
import { UserToken } from './entities/user-token';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserToken)
  async register(
    @Args({ name: 'registerInput', type: () => UserRegisterInput })
    registerInput: UserRegisterInput,
  ) {
    return await this.usersService.register(registerInput);
  }

  @Mutation(() => UserToken)
  async login(
    @Args({ name: 'loginInput', type: () => UserLoginInput })
    loginInput: UserLoginInput,
  ) {
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
