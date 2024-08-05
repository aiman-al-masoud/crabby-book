import http from "node:http";
import * as auth from './handlers/auth';
import * as query from "./handlers/handle-query";
import * as fs from 'fs'


const { SERVER_PORT } = process.env;

const server = http.createServer(async (req, res) => {

    const headers = {
        'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        /** add other headers as per requirement */
    }
    
    const requestUrl = auth.getRequestUrl(req);
    const {pathname} = requestUrl

    switch(true){

        case pathname === 'auth/ui/signup': {
            await auth.handleUiSignUp(req, res);
            break       
        }

        case pathname === '/auth/ui/signin': {
            await auth.handleUiSignIn(req, res);
            break;
        }

        case pathname === '/auth/callback':{
            await auth.handlePKCECallback(req, res, headers)
            break;
        }

        case pathname.startsWith('/query'): {
            await query.handleQuery(req, res, headers)
            break;
        }

        default: {
            res.writeHead(200, headers)
            res.write('ciao!')
            res.end();
            break;
        }

    }
});

server.listen(SERVER_PORT, () => {
    console.log(`HTTP server listening on port ${SERVER_PORT}...`);
});
