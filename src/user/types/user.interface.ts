import { UserEntity } from '@app/user/user.entity';

export type UserType = Pick<UserEntity, 'username' | 'email' | 'bio' | 'image'>;

export type UserReturnType = {
  user: UserType & { token: string };
};
