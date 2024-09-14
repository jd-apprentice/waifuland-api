import mongoose from "mongoose";
import { rollbar } from "../config/rollbar";
import { Config } from "../../app/config/config";
import { LogArgument } from "rollbar";

const loadDatabase = async (uri: string | undefined): Promise<void> => {
    try {
        if (!uri) {
            rollbar.error("URI not found");
            return;
        }
        const connection = await mongoose.connect(uri);
        if (Config.app.environment?.toUpperCase() === "PRODUCTION") {
            rollbar.info(`Connected to ${connection.connection.name} database.`);
        }
    } catch (err: unknown) {
        if (Config.app.environment === "PRODUCTION") {
            console.error(err);
            rollbar.error(err as LogArgument);
            return;
        }
        console.error(err)
    }
}

export { loadDatabase };