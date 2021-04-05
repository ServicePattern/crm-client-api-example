
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const brightpatternOrigin = process.env.BRIGHTPATTERN_ORIGIN || 'https://localhost:3000';

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
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: [
                  MiniCssExtractPlugin.loader,
                    'css-loader', 'postcss-loader'
                ],
            }

        ],
    },
    devServer: {
      contentBase: './public',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
              chunkFilename: '[id].[contenthash].css',
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve('./src/test.html'),
            templateParameters: {
                brightpatternOrigin
            }
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
}
