import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';

import { Tweet } from '../../tweets/entities/tweet.entity';
import { Follower } from '../../follower/entities/follower.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
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
  @Field()
  @Column({
    allowNull: false,
    unique: true,
  })
  email: string;
  @Field()
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
