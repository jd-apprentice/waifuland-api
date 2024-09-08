import mongoose from "mongoose";
import { rollbar } from "../config/rollbar";
import Config from "../../app/config/config";

const loadDatabase = async (uri: string | undefined): Promise<void> => {
    try {
        if (!uri) {
            rollbar.error("URI not found");
            return;
        }
        const connection = await mongoose.connect(uri);
        if (Config.app.environment != "TEST") {
            rollbar.info(`Connected to ${connection.connection.name} database.`);
        }
    } catch (err) {
        if (Config.app.environment != "TEST") {
            rollbar.error(err);
            return;
        }
        console.error(err)
    }
}

export { loadDatabase };