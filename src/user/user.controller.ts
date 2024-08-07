import {
  Body,
  ConflictException,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUserDto, UserResponseDto } from '@app/user/dto';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';

@ApiTags('Auth')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @ApiOperation({ summary: 'Create User' })
  @ApiBody({ type: CreateUserDto })
  @ApiException(() => ConflictException)
  @ApiCreatedResponse({
    type: UserResponseDto,
    description: 'User has been created.',
  })
  @UsePipes(new ValidationPipe())
  async createUser(@Body('user') createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @ApiOperation({ summary: 'Login User' })
  @ApiBody({ type: LoginUserDto })
  @ApiCreatedResponse({ type: UserResponseDto, description: 'Login success' })
  @ApiException(() => UnauthorizedException, {
    description: 'Email or password incorrect.',
  })
  @UsePipes(new ValidationPipe())
  async login(@Body('user') loginUserDto: LoginUserDto) {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildUserResponse(user);
  }
}
