import {defineConfig} from 'vite'
import {fileURLToPath} from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import path from 'path'

export default defineConfig({
    base: '/',
    plugins: [
        vue(),
        AutoImport({
            imports: ['vue'],
            resolvers: [ElementPlusResolver()],
            dts: fileURLToPath(new URL('./types/auto-import.d.ts', import.meta.url))
        }),
        Components({
            resolvers: [ElementPlusResolver()],
            dts: fileURLToPath(new URL('./types/components.d.ts', import.meta.url))
        }),
    ],
    server: {
        hmr: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
})
