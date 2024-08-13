import { ExpressRequest } from '@app/types';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<ExpressRequest>();

    if (req.user) {
      return true;
    }

    throw new UnauthorizedException();
  }
}
