import { Post } from 'src/posts/commons/post.entity';
import {
  Entity,
  Unique,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
@Unique(['name', 'username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 520, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  username!: string;

  @Column({ type: 'varchar', length: 520, nullable: false })
  email!: string;

  @Column({ type: 'varchar', length: 520, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  bio: string;

  @OneToMany(() => Post, (post) => post.owner)
  feed: Post[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor(
    name: string,
    email: string,
    username: string,
    bio = '',
    website = '',
  ) {
    this.bio = bio;
    this.name = name;
    this.email = email;
    this.username = username;
    this.website = website;
  }
}
