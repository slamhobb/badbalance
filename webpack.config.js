'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: NODE_ENV,

    context: path.resolve(__dirname, 'frontend'),

    entry: {
        spending: './spending/index.js',
        category: './category/index.js',
        debt: './debt/index.js',
        fastSpending: './fastSpending/index.js',
        userConfig: './userConfig/index.js',
        statistic: './statistic/index.js',
        cooperativeSpending: './cooperativeSpending/index.tsx'
    },

    output: {
        path: path.resolve(__dirname, 'static/build'),
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    watch: NODE_ENV === 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === 'development' ? 'inline-source-map' : false,

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],

    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'frontend'),
            use: 'babel-loader'
        }, {
            test: /\.tsx?$/,
            include: path.resolve(__dirname, 'frontend'),
            use: 'ts-loader'
        }, {
            test: /\.css$/,
            include: path.resolve(__dirname, 'frontend'),
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: NODE_ENV === 'development',
                        postcssOptions: {
                            plugins: [
                                'autoprefixer'
                            ]
                        }
                    }
                }
            ]
        }, {
            test: /\.svg$/,
            include: path.resolve(__dirname, 'frontend'),
            loader: 'raw-loader'
        }]
    }
};

if (NODE_ENV === 'production') {
    module.exports.optimization = {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false
            }),
            new CssMinimizerPlugin()
        ]
    };
}
