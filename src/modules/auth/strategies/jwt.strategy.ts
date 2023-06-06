import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import appConfig from 'src/config/app.config';
import { JwtUserDto } from '../dto/JwtUser.dto';
import { UserService } from '@user/service/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig().appSecret,
    });
  }

  async validate(payload: JwtUserDto) {
    const id = payload.userId;
    const user = await this.userService.findOne({id});

    if(!user) {
      throw new UnauthorizedException('У вас нет доступа');
    }

    return {
      userId: payload.userId,
      role: payload.role,
    };
  }
}
