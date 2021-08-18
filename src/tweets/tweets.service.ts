import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TWEET_REPOSITORY } from '../constants/constants';
import { User } from '../users/entities/user.entity';
import { CreateTweetInput } from './dto/create-tweet.input';
import { Tweet } from './entities/tweet.entity';
import { IPaginationResponse } from './models/IPaginationResponse';
import { IPaginationInput } from './models/IPaginationInput';

@Injectable()
export class TweetsService {
  constructor(
    @Inject(TWEET_REPOSITORY) private readonly tweetRepository: typeof Tweet,
  ) {}

  async create(
    userId: number,
    user: User,
    createTweetInput: CreateTweetInput,
  ): Promise<Tweet> {
    const { content } = createTweetInput;
    const tweet = new Tweet();
    tweet.user = user;
    tweet.userId = userId;
    tweet.content = content;
    await tweet.save(tweet as any);
    return tweet;
  }

  async getTweet(id: number, user: User): Promise<Tweet> {
    const tweet = await this.tweetRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!tweet) {
      throw new NotFoundException(`Tweet with ID ${id} not found`);
    } else {
      return tweet;
    }
  }

  async getMyTweets(
    user: User,
    pagination?: IPaginationInput,
  ): Promise<IPaginationResponse<Tweet>> {
    let paginationQuery = {};
    if (pagination)
      paginationQuery = {
        offset: pagination.skip,
        limit: pagination.limit + 1,
      };

    const tweets = await this.tweetRepository.findAll({
      where: { userId: user.id },
      ...paginationQuery,
    });

    let hasNext = false;
    if (pagination && tweets.length > pagination.limit) {
      hasNext = true;
      tweets.pop();
    }

    return {
      hasNext,
      data: tweets,
    };
  }
}
