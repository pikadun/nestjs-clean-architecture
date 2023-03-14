import { Global, Logger, Module } from "@nestjs/common";
import { Sequelize } from "@sequelize/core";
import mysql2 from "mysql2";
import { NodeEnv } from "../../common/types";
import ConfigModel from "../../core/models/config.model";
import UserModel from "../../core/models/user.model";

@Global()
@Module({
    providers: [{
        provide: Sequelize,
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: "mysql",
                database: process.env.DATABASE_NAME,
                host: process.env.DATABASE_HOST,
                port: process.env.DATABASE_PORT,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                sync: { alter: true },
                dialectModule: mysql2,
                timezone: "+08:00",
                noTypeValidation: true,
                logging: (msg: string) => Logger.debug(msg),
                models: [
                    ConfigModel,
                    UserModel
                ]
            });

            await sequelize.authenticate();
            if (process.env.NODE_ENV === NodeEnv.Debug) {
                await sequelize.sync();
            }
            return sequelize;
        }
    }],
    exports: [Sequelize]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class SequelizeModule { }
