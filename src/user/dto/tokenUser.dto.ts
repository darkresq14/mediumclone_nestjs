import { PickType } from '@nestjs/swagger';
import { UserEntity } from '@app/user/entity/user.entity';

export class TokenUserDto extends PickType(UserEntity, [
  'id',
  'username',
  'email',
] as const) {}
