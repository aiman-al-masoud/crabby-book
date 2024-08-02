import http from "node:http";
import { URL } from "node:url";
import * as queries from '../../dbschema/queries'
import * as edgedb from "edgedb";


export const handleQuery = async (req: http.IncomingMessage, res: http.ServerResponse) => {

    const url = new URL(req.url!, 'http://localhost:3000')

    const searchParams = cleanSearchParams(url.searchParams)
    const cookies = parseCookies(req.headers.cookie ?? '')
    const pathname = url.pathname
    const funcname = camelize(pathname.slice(1))
    const authToken = cookies['edgedb-auth-token']
    
    console.log('searchParams=', searchParams)
    console.log('cookies=', cookies)
    console.log('pathname=', pathname)
    console.log('funcname=', funcname)
    console.log()

    const client = edgedb.createClient().withGlobals({
        "ext::auth::client_token": authToken,
    });

    // @ts-ignore
    const func = queries[funcname]
    const result = await func(client, searchParams)

    console.log(result)

    res.statusCode = 200
    res.end()

}


function parseCookies(cookies:string){
    return Object.fromEntries(cookies.split('; ').filter(e=>e).map(e=>e.split('=')))
}

function camelize(name:string){
    return name.replace(/-./g, x=>x[1].toUpperCase())
}

function cleanSearchParams(sp:URLSearchParams){

    const object = Object.fromEntries(sp)
    const entries = Object.entries(object)
    const cleanEntries = entries.map(([k,v])=>[k, isNaN(parseFloat(v)) ? v : parseFloat(v) ])
    return Object.fromEntries(cleanEntries)
}


