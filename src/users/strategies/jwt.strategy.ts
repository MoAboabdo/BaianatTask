import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users.service';
import { ExtractJwt } from 'passport-jwt';
import { JwtDto } from '../dto/jwt.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: JwtDto) {
    const user = await this.userService.validateUser(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
