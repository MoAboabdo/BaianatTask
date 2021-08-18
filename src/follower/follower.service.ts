import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateFollowerInput } from './dto/create-follower.input';
import { FOLLOWER_REPOSITORY } from '../constants/constants';
import { UsersService } from '../users/users.service';
import { Follower } from './entities/follower.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class FollowerService {
  constructor(
    @Inject(FOLLOWER_REPOSITORY)
    private readonly userFollowerRepository: typeof Follower,
    private userService: UsersService,
  ) {}

  async followingUser(
    followUser: CreateFollowerInput,
    user: User,
  ): Promise<Follower> {
    const { followed_Id } = followUser;
    const followedUser = await this.userService.findUser(followed_Id);
    const userFollower = new Follower();
    if (followedUser) {
      userFollower.followedId = followed_Id;
      userFollower.followerId = user.id;
    } else {
      throw new NotFoundException(`user with ID ${followed_Id} not found`);
    }
    await userFollower.save();
    return userFollower;
  }

  async listFollower(user: User): Promise<Follower[]> {
    const followersList = await this.userFollowerRepository.findAll({
      where: {
        followedId: user.id,
      },
    });
    return followersList;
  }

  async listFollowed(user: User) {
    const followedList = await this.userFollowerRepository.findAll({
      where: {
        followerId: user.id,
      },
    });
    return followedList;
  }
}
