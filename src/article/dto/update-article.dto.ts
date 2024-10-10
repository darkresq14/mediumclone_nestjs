import { PartialType, PickType } from '@nestjs/swagger';
import { CreateArticleDto } from '@app/article/dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PartialArticleDto extends PartialType(
  PickType(CreateArticleDto, ['title', 'description', 'body']),
) {}

export class UpdateArticleDto {
  @ValidateNested()
  @Type(() => PartialArticleDto)
  @IsNotEmpty()
  article: PartialArticleDto;
}
