import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TweetsService } from './tweets.service';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetInput } from './dto/create-tweet.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../users/guards/gql-auth.guard';
import { CTxUser } from '../users/decorators/ctx-user.decorator';
import { User } from '../users/entities/user.entity';
import { GetMyTweetsPaginated } from './dto/GetMyTweetsPaginated.response';
import { PaginatedGetMyTweets } from './dto/PaginatedGetMyTweets.input';

@Resolver(() => Tweet)
export class TweetsResolver {
  constructor(private readonly tweetsService: TweetsService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Tweet)
  async getTweet(
    @Args('id') id: number,
    @CTxUser() user: User,
  ): Promise<Tweet> {
    return await this.tweetsService.getTweet(id, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => GetMyTweetsPaginated)
  async getMyTweets(
    @CTxUser() user: User,
    @Args('pagination', { nullable: true }) pagination?: PaginatedGetMyTweets,
  ): Promise<GetMyTweetsPaginated> {
    return await this.tweetsService.getMyTweets(user, pagination);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Tweet)
  createTweet(
    @CTxUser() user: User,
    @Args('createTweetInput') createTweetInput: CreateTweetInput,
  ) {
    return this.tweetsService.create(user.id, user, createTweetInput);
  }
}
