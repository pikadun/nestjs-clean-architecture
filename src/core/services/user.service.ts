import { BadRequestException, Inject } from "@nestjs/common";
import { Op, WhereOptions } from "@sequelize/core";
import { PageList, Provide } from "../../common/types";
import ICacheService from "../interfaces/cache.interface";
import IConfigService from "../interfaces/config.interface";
import IUserService from "../interfaces/user.interface";
import UserModel from "../models/user.model";

export default class UserService implements IUserService {
    constructor(
        @Inject(Provide.ConfigService) configService: IConfigService,
        @Inject(Provide.CacheService) private cacheService: ICacheService
    ) { }

    public async create(name: string, email: string): Promise<UserModel> {
        return UserModel.create({ name, email });
    }

    public async get(id: string): Promise<UserModel> {
        const user = await UserModel.findByPk(id);
        if (!user) {
            throw new BadRequestException("Invalid user id");
        }
        return user;
    }

    public async list(pageNo: number, pageSize: number, name?: string): Promise<PageList<UserModel>> {
        const where: WhereOptions<UserModel> = {};

        if (name) {
            where.name = {
                [Op.like]: `%${name}%`
            };
        }

        return UserModel.findAndCountAll({
            where: {
                name: name
            },
            limit: pageSize,
            offset: (pageNo - 1) * pageSize
        })
    }
}
