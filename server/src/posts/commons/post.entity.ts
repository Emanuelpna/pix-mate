import {
  Entity,
  Unique,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from 'src/users/commons/user.entity';

@Entity()
@Unique(['endpoint'])
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 520, nullable: false })
  endpoint!: string;

  @Column({ type: 'varchar', length: 520 })
  description: string;

  @ManyToOne(() => User, (user) => user.feed)
  owner!: User;

  @ManyToMany(() => User)
  @JoinTable()
  likes!: User[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
