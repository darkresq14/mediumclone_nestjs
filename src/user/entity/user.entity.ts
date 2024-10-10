import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { hash } from 'bcrypt';
import { IsEmail } from 'class-validator';
import { ArticleEntity } from '@app/article/entity/article.entity';
import { Type } from '@app/utils';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: Type<ArticleEntity>[];
}
