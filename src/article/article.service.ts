import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ArticleResponseDto,
  CreateArticleDto,
  UpdateArticleDto,
} from '@app/article/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '@app/article/entity/article.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from '@app/user/entity/user.entity';
import slugify from 'slugify';

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

    newArticle.slug = this.getSlug(newArticle.title);
    newArticle.author = currentUser;

    return await this.articleRepository.save(newArticle);
  }

  // findAll() {
  //   return `This action returns all articles`;
  // }

  async findOneBySlug(slug: string): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({ where: { slug } });

    if (!article) {
      throw new NotFoundException();
    }

    return article;
  }

  async updateBySlug(
    currentUserId: number,
    slug: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleEntity> {
    const article = await this.findOneBySlug(slug);

    if (article.author.id !== currentUserId) {
      throw new ForbiddenException();
    }

    if (updateArticleDto.article.title) {
      article.slug = this.getSlug(updateArticleDto.article.title);
    }

    Object.assign(article, updateArticleDto.article);

    return this.articleRepository.save(article);
  }

  async deleteBySlug(
    currentUserId: number,
    slug: string,
  ): Promise<DeleteResult> {
    const article = await this.findOneBySlug(slug);

    if (article.author.id !== currentUserId) {
      throw new ForbiddenException();
    }

    return await this.articleRepository.delete({ slug });
  }

  buildArticleResponse(article: ArticleEntity): ArticleResponseDto {
    const { id, ...rest } = article;
    return {
      article: { ...rest },
    };
  }

  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
