import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from '@app/article/article.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
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
  UpdateArticleDto,
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

  @Get(':slug')
  @ApiOperation({ summary: 'Get Article' })
  @ApiOkResponse({
    type: ArticleResponseDto,
    description: 'OK',
  })
  @ApiException(() => NotFoundException)
  async findOneBySlug(@Param('slug') slug: string) {
    const article = await this.articleService.findOneBySlug(slug);

    return this.articleService.buildArticleResponse(article);
  }

  @Put(':slug')
  @ApiOperation({ summary: 'Update Article' })
  @UseGuards(AuthGuard)
  @ApiBody({ type: UpdateArticleDto })
  @ApiOkResponse({
    type: ArticleResponseDto,
    description: 'Article has been updated',
  })
  @ApiException(() => ForbiddenException)
  @ApiException(() => NotFoundException)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateBySlug(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleResponseDto> {
    const article = await this.articleService.updateBySlug(
      currentUserId,
      slug,
      updateArticleDto,
    );

    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug')
  @ApiOperation({ summary: 'Delete Article' })
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Article has been deleted',
  })
  @ApiException(() => ForbiddenException)
  @ApiException(() => NotFoundException)
  async deleteBySlug(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.deleteBySlug(currentUserId, slug);
  }
}
