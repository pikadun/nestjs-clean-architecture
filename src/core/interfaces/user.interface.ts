import { PageList } from "../../common/types";
import UserModel from "../models/user.model";

export default interface IUserService {
    create(name: string, email: string): Promise<UserModel>;
    get(id: string): Promise<UserModel>;
    list(pageNo: number, pageSize: number, name?: string): Promise<PageList<UserModel>>;
}
