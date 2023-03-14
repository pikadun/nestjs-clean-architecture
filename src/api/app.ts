import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppConfiguration, Provide } from "../common/types";
import IConfigService from "../core/interfaces/config.interface";
import AppModule from "./app.module";

const mode = process.env.NODE_ENV;
if (!mode) {
    console.error("未指定环境变量：NODE_ENV");
    process.exit(1);
}

const start = async () => {
    const app = await NestFactory.create(AppModule);
    const appConfig = app.get<IConfigService>(Provide.ConfigService).get<AppConfiguration>("app");
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useLogger([appConfig.logLevel]);
    app.enableCors();
    await app.listen(appConfig.port);
    Logger.log(`App start with ${mode} mode`);
    Logger.log(`App is listening on http://localhost:${appConfig.port}`);
}

start().catch(error => {
    Logger.error(error);
    process.exit(1);
});
