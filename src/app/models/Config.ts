import {
  Model,
  Table,
  Column,
  UpdatedAt,
  CreatedAt,
  DeletedAt
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "configs",
  underscored: true
})
class Config extends Model<Config> {
  @Column
  name: string;

  @Column
  value: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

}

export default Config;
