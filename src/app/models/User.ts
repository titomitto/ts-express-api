import {
    Model,
    Table,
    Column,
    UpdatedAt,
    CreatedAt,
    BeforeUpdate,
    BeforeCreate,
    DeletedAt,
} from "sequelize-typescript";
import bcrypt from "bcrypt";

@Table({
    timestamps: true,
    tableName: "users"
})
class User extends Model<User> {
    @Column
    full_name: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column
    user_type: string

    @CreatedAt
    created_at: Date

    @UpdatedAt
    updated_at: Date

    @DeletedAt
    deleted_at: Date

    @BeforeUpdate
    @BeforeCreate
    static async hashPassword(instance: User) {
        instance.password = await bcrypt.hash(instance.password, 10);
    }

    toJSON() {
        let values = this.get();
        delete values.password;
        return values;
    }
}

export default User;
