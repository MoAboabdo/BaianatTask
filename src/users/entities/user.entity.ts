import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';

import { Tweet } from 'src/tweets/entities/tweet.entity';
import { Follower } from 'src/follower/entities/follower.entity';
@Table
export class User extends Model<User> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Tweet, 'userId')
  tweets: Tweet[];

  @HasMany(() => Follower, 'followerId')
  followers: Follower[];

  @HasMany(() => Follower, 'followedId')
  followed: Follower[];
}
