import { HttpException } from "@nestjs/common";

export default class BizException extends HttpException {
    constructor(msg: string) {
        super(msg, 999);
    }
}
