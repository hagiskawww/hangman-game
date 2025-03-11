import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import postcss from 'postcss'

export default defineConfig({
    base: '/hangman-game/',
    plugins: [
        tailwindcss(),
        postcss(),
    ],
})
