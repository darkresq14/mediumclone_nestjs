import { Type } from 'class-transformer';
import { IsEmail, ValidateNested } from 'class-validator';

export class PartialUserDto {
  @IsEmail()
  readonly email?: string;
  readonly username?: string;
  readonly password?: string;
  readonly image?: string;
  readonly bio?: string;
}

export class UpdateUserDto {
  @ValidateNested()
  @Type(() => PartialUserDto)
  user: PartialUserDto;
}
