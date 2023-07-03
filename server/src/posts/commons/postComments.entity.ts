import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

import { User } from 'src/users/commons/user.entity';
import { Post } from './post.entity';

@Entity()
export class PostComment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 520, nullable: false })
  description: string;

  @ManyToOne(() => Post, (post) => post.replys)
  replyTo!: Post;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinTable()
  owner!: User;

  @ManyToMany(() => User)
  @JoinTable()
  likes!: User[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
