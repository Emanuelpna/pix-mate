import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from 'src/users/commons/user.entity';

@Entity()
export class PostComment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 520, nullable: false })
  description: string;

  @ManyToMany(() => User)
  @JoinTable()
  owner!: User;

  @ManyToMany(() => User)
  @JoinTable()
  replys!: PostComment[];

  @ManyToMany(() => User)
  @JoinTable()
  likes!: User[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
