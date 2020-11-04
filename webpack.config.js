// jshint node: true
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function getCommonConfig(isDev) {
    'use strict';

    return {
        mode: isDev ? 'development' : 'production',
        output: {
            filename: '[name]/[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
        },
        devtool: isDev ? 'inline-source-map' : false,
        plugins: [],
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

function getSliderConfig(baseConfig) {
    'use strict';

    let config = Object.assign({}, baseConfig, {
        entry: {
            slider: ['@babel/polyfill', './src/index.ts'],
        }
    });
    config.plugins = [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new MiniCssExtractPlugin({
            filename: '[name]/[name].css',
        }),
        new CleanWebpackPlugin()
    ]
    config.devServer = {
        contentBase: './dist',
        inline: false
    }

    return config
}

function getDemoConfig(baseConfig) {
    'use strict';

    let config = Object.assign({}, baseConfig, {
        entry: {
            demo: ['@babel/polyfill', './src/index.ts', './src/demo/demo.ts']
        }
    });

    config.plugins = [
        new HtmlWebpackPlugin({
            filename: 'index.html',
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
        new CleanWebpackPlugin()
    ]
    config.devServer = {
        port: 4200,
        index: './docs/demo/index.html'
    }
    config.output = {
        filename: '[name]/[name].js',
        path: path.resolve(__dirname, 'docs'),
    }
    return config
}

module.exports = (env, argv) => {
    'use strict';

    let isDev = process.env.NODE_ENV === 'development'

    if (argv && argv.mode === 'development') {
        isDev = true
    } else if (argv && argv.mode === 'production') {
        isDev = false
    }

    const baseConfig = getCommonConfig(isDev)
    return [getSliderConfig(baseConfig), getDemoConfig(baseConfig)]
}
