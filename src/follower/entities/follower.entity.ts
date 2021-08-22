import { ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Table({ indexes: [{ unique: true, fields: ['followerId', 'followedId'] }] })
export class Follower extends Model<Follower> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, allowNull: false })
  followerId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, allowNull: false })
  followedId: number;

  @BelongsTo(() => User)
  followed: User;

  @BelongsTo(() => User)
  follower: User;
}
