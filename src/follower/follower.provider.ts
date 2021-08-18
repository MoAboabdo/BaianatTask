import { FOLLOWER_REPOSITORY } from '../constants/constants';
import { Follower } from './entities/follower.entity';
export const followerProviders = [
  {
    provide: FOLLOWER_REPOSITORY,
    useValue: Follower,
  },
];
