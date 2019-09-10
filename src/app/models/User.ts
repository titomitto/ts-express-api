import {
  Model,
  Table,
  Column,
  UpdatedAt,
  CreatedAt,
  BeforeUpdate,
  BeforeCreate,
  HasMany,
  DeletedAt
} from "sequelize-typescript";
import bcrypt from "bcrypt";
import { ResetToken} from "app/models";

@Table({
  timestamps: true,
  tableName: "users",
  underscored: true
})
class User extends Model<User> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  userType: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @HasMany(()=>ResetToken)
  resetTokens

  @BeforeUpdate
  @BeforeCreate
  static async hashPassword(instance: User) {
    instance.password = await bcrypt.hash(instance.password, 10);
  }

  toJSON() {
    let values = this.get() as User;
    delete values.password;
    return values;
  }
  
}

export default User;
