import mongoose from "mongoose";
import { rollbar } from "../config/rollbar";

const loadDatabase = async (uri: string): Promise<void> => {
    try {
        const connection = await mongoose.connect(uri);
        rollbar.info(`Connected to ${connection.connection.name} database.`);
    } catch (err) {
        rollbar.error(err);
    }
}

export { loadDatabase };