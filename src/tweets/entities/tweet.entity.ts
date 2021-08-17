import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BelongsTo, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Tweet {
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
  })
  content: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user?: User;
  static create: Tweet | PromiseLike<Tweet>;
}
