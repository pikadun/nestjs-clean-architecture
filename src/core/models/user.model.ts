import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";
import { Attribute, Comment, Default, PrimaryKey, Table } from "@sequelize/core/decorators-legacy";

type Attributes = InferAttributes<UserModel>;
type CreationAttributes = InferCreationAttributes<UserModel, { omit: 'id' }>;

@Table({
    tableName: "user",
    modelName: "user",
})
export default class UserModel extends Model<Attributes, CreationAttributes> {
    @PrimaryKey()
    @Default(DataTypes.UUIDV4())
    @Attribute(DataTypes.UUID())
    public declare id: string;

    @Comment("name")
    @Attribute(DataTypes.STRING())
    public declare name: string;

    @Comment("email")
    @Attribute(DataTypes.STRING())
    public declare email: string;
}
