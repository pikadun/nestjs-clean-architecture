import { Global, Module } from "@nestjs/common";
import { Provide } from "../../common/types";
import CacheService from "../services/cache.service";

@Global()
@Module({
    providers: [{
        provide: Provide.CacheService,
        useClass: CacheService
    }],
    exports: [
        Provide.CacheService
    ]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class CacheModule { }
