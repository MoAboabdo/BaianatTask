import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { usersProviders } from './user.provider';
import { JwtModule } from '@nestjs/jwt';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { RgisterFileResolver } from './uploadFile/fileUpload';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [
    UsersResolver,
    ...usersProviders,
    UsersService,
    GqlAuthGuard,
    RgisterFileResolver,
  ],
  exports: [UsersService],
})
export class UsersModule {}
