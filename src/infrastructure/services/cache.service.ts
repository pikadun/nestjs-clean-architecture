import { Injectable, Logger } from "@nestjs/common";
import { Op } from "@sequelize/core";
import ICacheService from "../../core/interfaces/cache.interface";
import CacheModel from "../../core/models/cache.model";

@Injectable()
export default class CacheService implements ICacheService {
    public async set<T>(key: string, obj: T, expiresInSeconds?: number) {
        const value = JSON.stringify(obj);
        const expiration = expiresInSeconds ? new Date(Date.now() + expiresInSeconds * 1000) : null;
        await CacheModel.upsert({ key, value, expiration });
        // 每次写完缓存后删除过期缓存
        CacheModel.destroy({
            where: {
                expiration: {
                    [Op.lt]: new Date()
                }
            }
        }).catch(error => {
            Logger.error("缓存删除失败");
            Logger.error(error);
        })
    }

    public async get<T>(key: string) {
        const record = await CacheModel.findByPk(key);
        if (record && !record.isExpired) {
            return JSON.parse(record.value) as T
        }
        return null;
    }

    public async remove(key: string) {
        await CacheModel.destroy({ where: { key } });
    }

    public async getAndRemove<T>(key: string) {
        const record = await this.get<T>(key);
        if (record) {
            await this.remove(key);
        }
        return record;
    }
}
