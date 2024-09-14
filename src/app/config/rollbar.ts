import Rollbar from "rollbar";
import { Config } from "./config";

export const rollbar = new Rollbar({
    accessToken: Config.rollbar.accessToken,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: Config.rollbar.environment,
});