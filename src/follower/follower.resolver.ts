import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { FollowerService } from './follower.service';
import { Follower } from './entities/follower.entity';
import { CreateFollowerInput } from './dto/create-follower.input';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { CTxUser } from 'src/users/decorators/ctx-user.decorator';

@Resolver(() => Follower)
export class FollowerResolver {
  constructor(
    private readonly userFollowerService: FollowerService,
    private readonly userService: UsersService,
  ) {}

  @Query(() => [Follower])
  async listFollower(@CTxUser() user: User): Promise<Follower[]> {
    return this.userFollowerService.listFollower(user);
  }

  @Query(() => [Follower])
  async listFollowed(@CTxUser() user: User): Promise<Follower[]> {
    return this.userFollowerService.listFollowed(user);
  }

  @Mutation(() => Follower)
  async makeFollowing(
    @Args('FollowUser') FollowUser: CreateFollowerInput,
    @CTxUser() user: User,
  ): Promise<Follower> {
    return this.userFollowerService.makeFollowing(FollowUser, user);
  }

  @ResolveField(() => User)
  async follower(@Parent() userFollow: Follower) {
    return this.userService.findUser(userFollow.followerId);
  }

  @ResolveField(() => User)
  async followed(@Parent() userFollow: Follower) {
    return this.userService.findUser(userFollow.followedId);
  }
}
