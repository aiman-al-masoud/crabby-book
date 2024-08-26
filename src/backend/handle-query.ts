import http from "node:http";
import { URL } from "node:url";
import * as queries from '../../dbschema/queries'
import * as edgedb from "edgedb";

export const handleQuery = async (
    req: http.IncomingMessage,
    res: http.ServerResponse,
) => {

    const url = new URL(req.url!, 'http://somehost')
    const searchParams = cleanSearchParams(url.searchParams)
    const cookies = parseCookies(req.headers.cookie ?? '')
    const pathname = url.pathname
    const funcname = camelize(pathname.replace('/query/', ''))
    const authToken = cookies['edgedb-auth-token']

    const json = await getJson(req)
    // @ts-ignore
    const func = queries[funcname]

    if (func === undefined) {

        res.writeHead(400, `Query ${funcname} is not supported.`)
        res.end()
        return
    }

    const client = edgedb.createClient().withGlobals({
        "ext::auth::client_token": authToken,
    });

    try {
        const results = await func(client, { ...json, ...searchParams })
        res.writeHead(200, 'ok')
        res.end(JSON.stringify(results))
    } catch (e) {
        console.log(e)
        res.writeHead(500, `${e}`)
        res.end()
    }
}

function parseCookies(cookies: string) {
    return Object.fromEntries(cookies.split('; ').filter(e => e).map(e => e.split('=')))
}

function camelize(name: string) {
    return name.replace(/-./g, x => x[1].toUpperCase())
}

function cleanSearchParams(sp: URLSearchParams) {

    const object = Object.fromEntries(sp)
    const entries = Object.entries(object)
    const cleanEntries = entries.map(([k, v]) => [k, isNaN(parseFloat(v)) ? v : parseFloat(v)])
    return Object.fromEntries(cleanEntries)
}

async function getJson(req: http.IncomingMessage, dflt = {}): Promise<object> {

    return new Promise((resolve, reject) => {

        let buffer = ''

        req.on('data', chunk => {
            buffer += chunk
        }).on('end', () => {

            try {
                const object = JSON.parse(buffer)
                resolve(object)
            } catch {
                resolve(dflt)
            }

        })

    })
}
