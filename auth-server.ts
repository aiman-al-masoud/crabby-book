/**
 * This code is taken from here: https://docs.edgedb.com/guides/auth/built_in_ui
 */

import http from "node:http";
import { URL } from "node:url";
import crypto from "node:crypto";
// import * as edgedb from "edgedb";


/**
 * You can get this value by running `edgedb instance credentials`.
 * Value should be:
 * `${protocol}://${host}:${port}/branch/${branch}/ext/auth/
 */
// const EDGEDB_AUTH_BASE_URL = process.env.EDGEDB_AUTH_BASE_URL;
const EDGEDB_AUTH_BASE_URL = 'http://localhost:10701/db/main/ext/auth/'
const SERVER_PORT = 3000;

/**
 * Generate a random Base64 url-encoded string, and derive a "challenge"
 * string from that string to use as proof that the request for a token
 * later is made from the same user agent that made the original request
 */
const generatePKCE = () => {
    const verifier = crypto.randomBytes(32).toString("base64url");

    const challenge = crypto
        .createHash("sha256")
        .update(verifier)
        .digest("base64url");

    return { verifier, challenge };
};


/**
 * In Node, the `req.url` is only the `pathname` portion of a URL. In
 * order to generate a full URL, we need to build the protocol and host
 * from other parts of the request.
 *
 * One reason we like to use `URL` objects here is to easily parse the
 * `URLSearchParams` from the request, and rather than do more error
 * prone string manipulation, we build a `URL`.
 *
 * @param {Request} req
 */
const getRequestUrl = (req:any) => {
    const protocol = req.connection.encrypted ? "https" : "http";
    return new URL(req.url, `${protocol}://${req.headers.host}`);
};

const server = http.createServer(async (req, res) => {
    const requestUrl = getRequestUrl(req);

    switch (requestUrl.pathname) {
        case "/auth/ui/signin": {
            await handleUiSignIn(req, res);
            break;
        }

        case "/auth/ui/signup": {
            await handleUiSignUp(req, res);
            break;
        }

        case "/auth/callback": {
            await handleCallback(req, res);
            break;
        }

        default: {
            res.writeHead(404);
            res.end("Not found");
            break;
        }
    }
});

/**
 * Redirects browser requests to EdgeDB Auth UI sign in page with the
 * PKCE challenge, and saves PKCE verifier in an HttpOnly cookie.
 *
 * @param {Request} req
 * @param {Response} res
 */
const handleUiSignIn = async (req:any, res:any) => {
    const { verifier, challenge } = generatePKCE();

    const redirectUrl = new URL("ui/signin", EDGEDB_AUTH_BASE_URL);
    redirectUrl.searchParams.set("challenge", challenge);

    res.writeHead(301, {
        "Set-Cookie": `edgedb-pkce-verifier=${verifier}; HttpOnly; Path=/; Secure; SameSite=Strict`,
        Location: redirectUrl.href,
    });
    res.end();
};

/**
 * Redirects browser requests to EdgeDB Auth UI sign up page with the
 * PKCE challenge, and saves PKCE verifier in an HttpOnly cookie.
 *
 * @param {Request} req
 * @param {Response} res
 */
const handleUiSignUp = async (req:any, res:any) => {
    const { verifier, challenge } = generatePKCE();

    const redirectUrl = new URL("ui/signup", EDGEDB_AUTH_BASE_URL);
    redirectUrl.searchParams.set("challenge", challenge);

    res.writeHead(301, {
        "Set-Cookie": `edgedb-pkce-verifier=${verifier}; HttpOnly; Path=/; Secure; SameSite=Strict`,
        Location: redirectUrl.href,
    });
    res.end();
};

server.listen(SERVER_PORT, () => {
    console.log(`HTTP server listening on port ${SERVER_PORT}...`);
});



/**
* Handles the PKCE callback and exchanges the `code` and `verifier
* for an auth_token, setting the auth_token as an HttpOnly cookie.
*
* @param {Request} req
* @param {Response} res
*/
const handleCallback = async (req:any, res:any) => {

    console.log('handleCallback' /* , req, res */)

    const requestUrl = getRequestUrl(req);

    const code = requestUrl.searchParams.get("code");
    if (!code) {
        const error = requestUrl.searchParams.get("error");
        res.status = 400;
        res.end(
            `OAuth callback is missing 'code'. \
 OAuth provider responded with error: ${error}`,
        );
        return;
    }

    console.log('code=', code)

    const cookies = req.headers.cookie?.split("; ");
    const verifier = cookies
        ?.find((cookie:any) => cookie.startsWith("edgedb-pkce-verifier="))
        ?.split("=")[1];
    if (!verifier) {
        res.status = 400;
        res.end(
            `Could not find 'verifier' in the cookie store. Is this the \
 same user agent/browser that started the authorization flow?`,
        );
        return;
    }

    console.log('verifier=', verifier)

    const codeExchangeUrl = new URL("token", EDGEDB_AUTH_BASE_URL);
    codeExchangeUrl.searchParams.set("code", code);
    codeExchangeUrl.searchParams.set("verifier", verifier);
    const codeExchangeResponse = await fetch(codeExchangeUrl.href, {
        method: "GET",
    });

    console.log('codeExchangeResponse=', codeExchangeResponse)

    if (!codeExchangeResponse.ok) {
        const text = await codeExchangeResponse.text();
        res.status = 400;
        res.end(`Error from the auth server: ${text}`);
        return;
    }

    const { auth_token } = await codeExchangeResponse.json();

    console.log('auth_token=', auth_token)

    res.writeHead(204, {
        "Set-Cookie": `edgedb-auth-token=${auth_token}; HttpOnly; Path=/; Secure; SameSite=Strict`,
    });
    res.end();
};