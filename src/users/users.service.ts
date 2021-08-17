import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USER_REPOSITORY } from 'src/constants/constants';
import { UserLoginInput } from './dto/user-login.input';
import { UserRegisterInput } from './dto/user-register.input';
import { User } from '../users/entities/user.entity';
import { AuthHelper } from './auth.helper';
import { JwtDto } from './dto/jwt.dto';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './entities/user-token';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private readonly jwt: JwtService,
  ) {}

  async findUser(user_Id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: user_Id } });
    return user;
  }

  async login(loginInput: UserLoginInput): Promise<UserToken> {
    const { email, password } = loginInput;
    const userExist = await this.userRepository.findOne({ where: { email } });

    if (!userExist) {
      throw new NotFoundException(`User with email ${email} does not exist`);
    }

    const passwordValid = await AuthHelper.validate(
      password,
      userExist.password,
    );

    if (!passwordValid) {
      throw new Error('Invalid password');
    }
    return { user: userExist, token: this.signToken(userExist.id) };
  }

  async register(registerInput: UserRegisterInput): Promise<UserToken> {
    const { email, password } = registerInput;
    const userExist = await this.userRepository.findOne({
      where: { email },
    });
    if (userExist) {
      throw new BadRequestException(`Cannot register with email ${email}`);
    }

    const user = new User();
    user.email = email;
    user.password = await AuthHelper.hash(password);
    await user.save(user as any);
    return { user: user, token: this.signToken(user.id) };
  }

  private signToken(id: number) {
    const payload: JwtDto = { userId: id };

    return this.jwt.sign(payload);
  }

  public async validateUser(userId: number) {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
