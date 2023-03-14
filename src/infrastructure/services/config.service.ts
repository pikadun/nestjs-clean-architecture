import { LogLevel } from "@nestjs/common";
import {
    AppConfiguration,
    NodeEnv
} from "../../common/types";
import IConfigService from "../../core/interfaces/config.interface";
import ConfigModel from "../../core/models/config.model";

interface Configuration {
    [x: string]: unknown;
    app: AppConfiguration;
}

export default class ConfigService implements IConfigService {
    private declare configuration: Configuration;

    public async init() {
        const items = await ConfigModel.findAll();
        const obj: Record<string, string> = {};
        for (const item of items) {
            obj[item.key] = item.value;
        }

        const PORT = process.env.PORT

        this.configuration = {
            app: {
                port: PORT ? parseInt(PORT) : 80,
                logLevel: process.env.LOG_LEVEL as LogLevel,
                tokenKey: obj.TOKEN_KEY
            },
            tencent: {
                credential: {
                    secretId: obj.TENCENT_SECRET_ID,
                    secretKey: obj.TENCENT_SECRET_KEY
                },
                sms: {
                    appId: obj.TENCENT_SMS_APP_ID,
                    templateId: obj.TENCENT_SMS_TEMPLATE_ID,
                    sign: obj.TENCENT_SMS_SIGN
                },
                cos: {
                    bucket: obj.TENCENT_COS_BUCKET
                }
            },
            url: {
                questionService: obj.QUESTION_SERVICE_URL,
                conversationService: obj.CONVERSATION_SERVICE_URL,
                serviceUrl: process.env.NODE_ENV === NodeEnv.Debug ? obj.SERVICE_URL_DEBUG : obj.SERVICE_URL
            }
        }
    }

    public get<T = string>(key: string): T {
        try {
            const props = key.split(".");
            let object: Record<string, unknown> = this.configuration;
            let property = props.shift();

            while (property) {
                object = object[property] as Record<string, unknown>;
                property = props.shift();
            }

            return object as T;
        } catch (error) {
            throw Error(`Configuration key "${key}" does not exist`);
        }

    }
}
