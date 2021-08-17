import { TWEET_REPOSITORY } from 'src/constants/constants';
import { Tweet } from './entities/tweet.entity';

export const tweetsProviders = [
  {
    provide: TWEET_REPOSITORY,
    useValue: Tweet,
  },
];
