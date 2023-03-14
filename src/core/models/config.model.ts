import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";
import { AllowNull, Attribute, Comment, PrimaryKey, Table } from "@sequelize/core/decorators-legacy";

type Attributes = InferAttributes<ConfigModel>;
type CreationAttributes = InferCreationAttributes<ConfigModel>;

@Table({
    tableName: "config",
    modelName: "config"
})
export default class ConfigModel extends Model<Attributes, CreationAttributes> {
    @PrimaryKey()
    @Comment("配置key")
    @Attribute(DataTypes.STRING())
    public declare key: string;

    @AllowNull(false)
    @Comment("配置value")
    @Attribute(DataTypes.TEXT())
    public declare value: string;

    @Comment("说明")
    @Attribute(DataTypes.TEXT())
    public declare description: string;
}
