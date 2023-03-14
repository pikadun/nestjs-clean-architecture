export default interface IConfigService {
    get<T = string>(key: string): T;
}
