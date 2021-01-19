
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const brightpatternOrigin = process.env.BRIGHTPATTERN_ORIGIN || 'https://ocean08.brightpattern.com';

module.exports = {
    entry: path.resolve(__dirname, 'src', 'example.ts'),
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'example.js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve('./src/test.html'),
            templateParameters: {
                brightpatternOrigin
            }
        }),
    ],
    resolve: {
        extensions: ['.ts'],
    },
}
