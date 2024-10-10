import { OmitType } from '@nestjs/swagger';
import { UserEntity } from '@app/user/entity/user.entity';

export class UserResponseDto {
  user: UserDto;
}

export class UserDto extends OmitType(UserEntity, [
  'hashPassword',
  'id',
  'password',
  'articles',
] as const) {
  token: string;
}

export class AuthorDto extends OmitType(UserDto, ['token', 'email']) {}
