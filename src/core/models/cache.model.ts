import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";
import { Attribute, Comment, PrimaryKey, Table } from "@sequelize/core/decorators-legacy";

type Attributes = InferAttributes<CacheModel>;
type CreationAttributes = InferCreationAttributes<CacheModel, { omit: 'isExpired' }>;

@Table({
    tableName: "cache",
    modelName: "cache",
})
export default class CacheModel extends Model<Attributes, CreationAttributes> {
    @PrimaryKey()
    @Comment("缓存key")
    @Attribute(DataTypes.STRING())
    public declare key: string;

    @Comment("缓存value")
    @Attribute(DataTypes.TEXT())
    public declare value: string;

    @Comment("过期时间")
    @Attribute(DataTypes.DATE())
    public declare expiration: Date | null;

    @Comment("是否过期")
    @Attribute(DataTypes.VIRTUAL())
    public get isExpired(): boolean {
        const expiration = this.getDataValue("expiration");
        return expiration !== null && expiration < new Date();
    }
}
