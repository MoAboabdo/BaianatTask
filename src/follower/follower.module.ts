import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerResolver } from './follower.resolver';
import { followerProviders } from './follower.provider';
import { UsersModule } from '../users/users.module';
@Module({
  providers: [...followerProviders, FollowerResolver, FollowerService],
  imports: [UsersModule],
})
export class FollowerModule {}
