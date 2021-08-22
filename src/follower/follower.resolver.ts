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
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CTxUser } from '../users/decorators/ctx-user.decorator';
import { FollowerType } from './followerType';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/users/guards/gql-auth.guard';

@Resolver(() => FollowerType)
@UseGuards(GqlAuthGuard)
export class FollowerResolver {
  constructor(
    private readonly userFollowerService: FollowerService,
    private readonly userService: UsersService,
  ) {}

  @Query(() => [FollowerType])
  async listFollower(@CTxUser() user: User): Promise<Follower[]> {
    return this.userFollowerService.listFollower(user);
  }

  @Query(() => [FollowerType])
  async listFollowed(@CTxUser() user: User): Promise<Follower[]> {
    return this.userFollowerService.listFollowed(user);
  }

  @Mutation(() => FollowerType)
  async followingUser(
    @Args('FollowUser') FollowUser: CreateFollowerInput,
    @CTxUser() user: User,
  ): Promise<Follower> {
    return this.userFollowerService.followingUser(FollowUser, user);
  }

  @ResolveField(() => User)
  async follower(@Parent() userFollow: FollowerType) {
    return this.userService.findUser(userFollow.followerId);
  }

  @ResolveField(() => User)
  async followed(@Parent() userFollow: FollowerType) {
    return this.userService.findUser(userFollow.followedId);
  }
}
