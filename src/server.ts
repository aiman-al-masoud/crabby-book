import http from "node:http";
import * as auth from './handlers/auth';
import { handleQuery } from "./handlers/handle-query";

const { SERVER_PORT } = process.env;

const server = http.createServer(async (req, res) => {

    const requestUrl = auth.getRequestUrl(req);

    switch (requestUrl.pathname) {
        case "/auth/ui/signin": {
            await auth.handleUiSignIn(req, res);
            break;
        }

        case "/auth/ui/signup": {
            await auth.handleUiSignUp(req, res);
            break;
        }

        case "/auth/callback": {
            await auth.handlePKCECallback(req, res);
            break;
        }

        default: {

            await handleQuery(req, res)
            break;
            // res.writeHead(404);
            // res.end("Not found");
            // break;
        }
    }
});

server.listen(SERVER_PORT, () => {
    console.log(`HTTP server listening on port ${SERVER_PORT}...`);
});
