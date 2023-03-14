import { Global, Module } from "@nestjs/common";
import { Sequelize } from "@sequelize/core";
import { Provide } from "../../common/types";
import ConfigService from "../services/config.service";

@Global()
@Module({
    providers: [{
        inject: [Sequelize],
        provide: Provide.ConfigService,
        useFactory: async () => {
            const service = new ConfigService();
            await service.init();
            return service;
        }
    }],
    exports: [Provide.ConfigService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ConfigModule { }
