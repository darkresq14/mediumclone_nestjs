import { Injectable } from '@nestjs/common';
import {
  ArticleDto,
  ArticleResponseDto,
  UpdateArticleDto,
  CreateArticleDto,
} from '@app/article/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '@app/article/entity/article.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '@app/user/entity/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createArticle(
    createArticleDto: CreateArticleDto,
    currentUser: UserEntity,
  ): Promise<ArticleEntity> {
    const newArticle = new ArticleEntity();
    Object.assign(newArticle, createArticleDto);
    if (!newArticle.tagList) {
      newArticle.tagList = [];
    }

    newArticle.slug = 'foo';
    newArticle.author = currentUser;

    return await this.articleRepository.save(newArticle);
  }

  // findAll() {
  //   return `This action returns all articles`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #id article`;
  // }

  // update(id: number, updateArticleDto: UpdateArticleDto) {
  //   return `This action updates a #id article`;
  // }

  // remove(id: number) {
  //   return `This action removes a #id article`;
  // }

  buildArticleResponse(article: ArticleEntity): ArticleResponseDto {
    const { id, ...rest } = article;
    return {
      article: { ...rest },
    };
  }
}
