import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import postcss from 'postcss'

export default defineConfig({
    plugins: [
        tailwindcss(),
        postcss(),
    ],
})
