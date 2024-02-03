import { app } from "./main";
import { loadDatabase } from "./db";
import Config from "./config/config";

const server = app.listen(Config.app.port || 3000, async () => {
    await loadDatabase(Config.db.uri);
    console.log(`
        ██╗    ██╗ █████╗ ██╗███████╗██╗   ██╗██╗      █████╗ ███╗   ██╗██████╗      █████╗ ██████╗ ██╗
        ██║    ██║██╔══██╗██║██╔════╝██║   ██║██║     ██╔══██╗████╗  ██║██╔══██╗    ██╔══██╗██╔══██╗██║
        ██║ █╗ ██║███████║██║█████╗  ██║   ██║██║     ███████║██╔██╗ ██║██║  ██║    ███████║██████╔╝██║
        ██║███╗██║██╔══██║██║██╔══╝  ██║   ██║██║     ██╔══██║██║╚██╗██║██║  ██║    ██╔══██║██╔═══╝ ██║
        ╚███╔███╔╝██║  ██║██║██║     ╚██████╔╝███████╗██║  ██║██║ ╚████║██████╔╝    ██║  ██║██║     ██║
         ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝╚═╝      ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝     ╚═╝  ╚═╝╚═╝     ╚═╝`);
});

export { server };