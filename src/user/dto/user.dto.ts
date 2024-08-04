import { IsEmail } from 'class-validator';

export class UserResponseDto {
  user: UserDto;
}

export class UserDto {
  username: string;
  @IsEmail()
  email: string;
  bio: string;
  image: string;
  token: string;
}
