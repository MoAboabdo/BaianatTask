import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/entities/user.entity';
import { Tweet } from '../tweets/entities/tweet.entity';
import { Follower } from '../follower/entities/follower.entity';

import {
  SEQUELIZE,
  DEVELOPMENT,
  TEST,
  PRODUCTION,
} from '../constants/constants';
const databaseConfig = require('./database.config');

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Tweet, Follower]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
