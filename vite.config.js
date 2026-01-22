import {resolve} from 'path'
import handlebars from 'vite-plugin-handlebars'
import tailwindcss from '@tailwindcss/vite'

export default {
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/views'),
        }),
        tailwindcss(),
    ],
}
