import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {InjectRepository} from '@nestjs/typeorm';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Repository} from 'typeorm';

import {User} from '@nest-nx-payment/persistence';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.user.accessToken.secret'),
      ignoreExpiration: true, // For Testing
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload): Promise<User> {
    return await this.userRepository.findOneBy({
      id: payload.id
    });
  }
}
