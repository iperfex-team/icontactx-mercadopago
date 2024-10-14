import path from "path";
import { defineConfig } from "vite";
// import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 5176,  // Establece el puerto 3022
    },
});
