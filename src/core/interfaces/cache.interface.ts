export default interface ICacheService {
    /**
     * 设置缓存
     * @param key 缓存 key
     * @param obj 缓存 value
     * @param expiresInSeconds 过期时间，单位秒
     */
    set<T>(key: string, obj: T, expiresInSeconds?: number): Promise<void>;

    /**
     * 获取缓存
     * @param key 缓存key
     */
    get<T>(key: string): Promise<T | null>;
    /**
     * 删除缓存
     * @param key 缓存key
     */
    remove(key: string): Promise<void>;

    /**
     * 获取并删除缓存，适用于只能使用一次的缓存，比如验证码等
     * @param key 缓存key
     */
    getAndRemove<T>(key: string): Promise<T | null>;
}
