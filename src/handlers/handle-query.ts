import http from "node:http";
import { URL } from "node:url";
import * as queries from '../../dbschema/queries'


export const handleQuery = async (req: http.IncomingMessage, res: http.ServerResponse) => {

    const url = new URL(req.url!, 'http://localhost:3000')

    const searchParams = url.searchParams
    const cookies = parseCookies(req.headers.cookie ?? '')
    const pathname = url.pathname
    const funcname = camelize(pathname.slice(1))

    console.log('searchParams=', searchParams)
    console.log('cookies=', cookies)
    console.log('pathname=', pathname)
    console.log('funcname=', funcname)
    console.log(queries[funcname])

    res.statusCode = 200
    res.end()

}


function parseCookies(cookies:string){
    return Object.fromEntries(cookies.split('; ').filter(e=>e).map(e=>e.split('=')))
}

function camelize(name:string){
    return name.replace(/-./g, x=>x[1].toUpperCase())
}
