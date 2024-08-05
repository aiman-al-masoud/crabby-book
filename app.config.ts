import { defineConfig } from "@solidjs/start/config";


export default defineConfig({
    ssr: true,
    server: {
        baseURL: "/", // for corret relative urls in built index.html file
        preset: "static",

        routeRules: {
            '/api/v1/**' : {
                cors:true,
                proxy: {
                    to: "http://localhost:3001/**"
                },
            }
        }
    }
});