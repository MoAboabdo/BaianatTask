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

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async login(loginInput: UserLoginInput): Promise<User> {
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
    return userExist;
  }

  async register(registerInput: UserRegisterInput): Promise<User> {
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
    return user;
  }
}
