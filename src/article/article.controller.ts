import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from '@app/article/article.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@app/user/guards/auth-guard.guard';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { User } from '@app/user/decorators/user.decorator';
import {
  CreateArticleDto,
  ArticleResponseDto,
  CreateArticleRequestDto,
} from '@app/article/dto';
import { UserEntity } from '@app/user/entity/user.entity';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  @ApiOperation({ summary: 'Create Article' })
  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateArticleRequestDto })
  @ApiCreatedResponse({
    type: ArticleResponseDto,
    description: 'Article has been created',
  })
  @ApiException(() => UnauthorizedException)
  @UsePipes(new ValidationPipe())
  async create(
    @Body('article') createArticleDto: CreateArticleDto,
    @User() currentUser: UserEntity,
  ): Promise<ArticleResponseDto> {
    const createdArticle = await this.articleService.createArticle(
      createArticleDto,
      currentUser,
    );
    return this.articleService.buildArticleResponse(createdArticle);
  }
  // @Get()
  // findAll() {
  //   return this.articleService.findAll();
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.articleService.findOne(+id);
  // }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
  //   return this.articleService.update(+id, updateArticleDto);
  // }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.articleService.remove(+id);
  // }
}
