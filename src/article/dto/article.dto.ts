import { ArticleEntity } from '../entity/article.entity';
import { OmitType } from '@nestjs/swagger';

export class ArticleResponseDto {
  article: ArticleDto;
}

export class ArticleDto extends OmitType(ArticleEntity, [
  'id',
  'updateTimestamp',
]) {}
