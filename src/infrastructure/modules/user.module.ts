import { Module } from "@nestjs/common";
import { Provide } from "../../common/types";
import UserService from "../../core/services/user.service";

@Module({
    providers: [{
        provide: Provide.UserService,
        useClass: UserService
    }],
    exports: [
        Provide.UserService
    ]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class UserModule { }
