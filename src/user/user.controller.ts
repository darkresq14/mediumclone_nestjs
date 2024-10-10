import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserDto,
  CreateUserRequestDto,
  LoginUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '@app/user/dto';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { User } from '@app/user/decorators/user.decorator';
import { UserEntity } from '@app/user/entity/user.entity';
import { AuthGuard } from '@app/user/guards/auth-guard.guard';

@ApiTags('Auth')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @ApiOperation({ summary: 'Registration' })
  @ApiBody({ type: CreateUserRequestDto })
  @ApiException(() => ConflictException)
  @ApiCreatedResponse({
    type: UserResponseDto,
    description: 'User has been created',
  })
  @UsePipes(new ValidationPipe())
  async createUser(@Body('user') createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @ApiOperation({ summary: 'Authentication' })
  @ApiBody({ type: LoginUserDto })
  @ApiCreatedResponse({ type: UserResponseDto, description: 'Login success' })
  @ApiException(() => UnauthorizedException, {
    description: 'Email or password incorrect',
  })
  @UsePipes(new ValidationPipe())
  async login(@Body('user') loginUserDto: LoginUserDto) {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get Current User' })
  @ApiOkResponse({ type: UserResponseDto, description: 'OK' })
  @ApiException(() => UnauthorizedException)
  getCurrentUser(@User() user: UserEntity) {
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update User' })
  @ApiOkResponse({
    type: UserResponseDto,
    description: 'User has been updated',
  })
  @ApiException(() => UnauthorizedException)
  @ApiException(() => BadRequestException)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @User('id') id: number,
  ) {
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    return this.userService.buildUserResponse(updatedUser);
  }
}
