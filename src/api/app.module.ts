import { Module } from "@nestjs/common";
import CacheModule from "../infrastructure/modules/cache.module";
import ConfigModule from "../infrastructure/modules/config.module";
import SequelizeModule from "../infrastructure/modules/sequelize.module";
import UserModule from "../infrastructure/modules/user.module";
import UserController from "./controllers/user.controller";

@Module({
    imports: [
        CacheModule,
        ConfigModule,
        SequelizeModule,
        UserModule,
    ],
    providers: [],
    controllers: [
        UserController
    ]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class AppModule { }
