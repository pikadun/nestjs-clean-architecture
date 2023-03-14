import { Body, Controller, Get, Inject, Param, Post, Query } from "@nestjs/common";
import { Provide } from "../../common/types";
import IUserService from "../../core/interfaces/user.interface";
import { UserCreateBody, UserListQuery } from "../validator";

@Controller("/api/user")
export default class UserController {
    constructor(
        @Inject(Provide.UserService) private userService: IUserService
    ) { }

    @Post("/")
    create(@Body() body: UserCreateBody) {
        const { name, email } = body;
        return this.userService.create(name, email);
    }

    @Get("/:id")
    get(@Param("id") id: string) {
        return this.userService.get(id);
    }

    @Get("/")
    list(@Query() query: UserListQuery) {
        const { pageNo, pageSize, name } = query;
        return this.userService.list(pageNo, pageSize, name);
    }

}
