import { AuthorDto } from '@app/user/dto/user.dto';
import { ArticleEntity } from '@app/article/entity/article.entity';
import { OmitType } from '@nestjs/swagger';

export class ArticleResponseDto {
  article: ArticleWithLimitedAuthorDto;
}

export class ArticleDto extends OmitType(ArticleEntity, [
  'id',
  'updateTimestamp',
]) {}

export class ArticleWithLimitedAuthorDto extends OmitType(ArticleDto, [
  'author',
]) {
  author: AuthorDto;
}
