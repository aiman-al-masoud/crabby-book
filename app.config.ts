import { defineConfig } from "@solidjs/start/config";


export default defineConfig({
    ssr: true,
    appRoot: "src/frontend",
    server: {
        baseURL: "/", // for corret relative urls in built index.html file
        preset: "static",
    }
});