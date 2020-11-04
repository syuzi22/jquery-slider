// jshint node: true
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function getConfig(isDev) {
    'use strict';

    return {
        mode: isDev ? 'development' : 'production',
        entry: {
            slider: ['@babel/polyfill', './src/index.ts'],
            demo: ['@babel/polyfill', './src/index.ts', './src/demo/demo.ts']
        },
        output: {
            filename: '[name]/[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
        },
        devServer: {
            port: 4200,
            index: './demo/index.html',
        },
        devtool: isDev ? 'inline-source-map' : false,
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'demo/index.html',
                template: 'src/demo/index.html',
                chunks: ['demo']
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
            }),
            new MiniCssExtractPlugin({
                filename: '[name]/[name].css',
            }),
            new CleanWebpackPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {},
                        },
                        'css-loader'
                    ],
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    loader: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-typescript'
                            ],
                            plugins: [
                                '@babel/plugin-proposal-class-properties'
                            ]
                        }
                    }
                },
                {
                    test: /\.ts$/,
                    exclude: [ path.resolve(__dirname, 'test') ],
                    enforce: 'post',
                    use: {
                        loader: 'istanbul-instrumenter-loader',
                        options: { esModules: true }
                    }
                }
            ]
        }
    }
}

module.exports = (env, argv) => {
    'use strict';

    let isDev = process.env.NODE_ENV === 'development'

    if (argv.mode === 'development') {
        isDev = true
    } else if (argv.mode === 'production') {
        isDev = false
    }

    return getConfig(isDev)
}
