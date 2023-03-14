import { Transform, TransformFnParams } from "class-transformer";
import { IsInt, IsPositive, IsString } from "class-validator";
import { IsOptionalOrEmptyString } from "../common/decorator";

class PaginationQuery {
    @IsInt()
    @IsPositive()
    @Transform((v: TransformFnParams) => parseInt(v.value as string))
    declare pageNo: number;
    @IsInt()
    @IsPositive()
    @Transform((v: TransformFnParams) => parseInt(v.value as string))
    declare pageSize: number;
}

//#region user.controller.ts
export class UserCreateBody {
    @IsString()
    declare name: string;
    @IsString()
    declare email: string;
}

export class UserListQuery extends PaginationQuery {
    @IsOptionalOrEmptyString()
    @IsString()
    declare name?: string;
}
//#endregion
