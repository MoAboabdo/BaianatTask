import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsResolver } from './tweets.resolver';
import { tweetsProviders } from './tweets.providers';

@Module({
  providers: [TweetsResolver, ...tweetsProviders, TweetsService],
  exports: [TweetsService],
})
export class TweetsModule {}
