import { SetMetadata } from "@nestjs/common";
import { ValidateIf } from "class-validator";
import { Metadata } from "./types";

export const AllowAnonymous: () => MethodDecorator = () => SetMetadata(Metadata.AllowAnonymous, true);

export const IsOptionalOrEmptyString: () => PropertyDecorator = () => {
    return ValidateIf((_obj, value) => {
        return value !== null && value !== undefined && value !== ''
    })
}
