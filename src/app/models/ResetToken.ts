import {
  Model,
  Table,
  Column,
  UpdatedAt,
  CreatedAt,
  BelongsTo,
  ForeignKey,
  DeletedAt
} from "sequelize-typescript";
import User from "./User";

@Table({
  timestamps: true,
  tableName: "reset_token",
  underscored: true
})
class ResetToken extends Model<ResetToken> {
  @ForeignKey(()=> User)
  userId: number;

  @Column
  token: string;

  @Column
  used: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @BelongsTo(()=> User)
  user: User
}

export default ResetToken;
