import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Reflector} from '@nestjs/core';
import {AuthGuard} from '@nestjs/passport';

@Injectable()
export class JwtAccessGuard extends AuthGuard('access') {
  constructor(
    private readonly configService: ConfigService,
    private reflector: Reflector
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isGlobalGuardsIgnored = this.reflector.getAllAndOverride<boolean>(
      'ignore-global-guards',
      [context.getHandler(), context.getClass()]
    );
    if (isGlobalGuardsIgnored) return true;

    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      this.configService.get('key.isPublic'),
      [context.getHandler(), context.getClass()]
    );
    if (isPublic && !token) return true;
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user)
      throw err || new UnauthorizedException();
    return user;
  }
}
