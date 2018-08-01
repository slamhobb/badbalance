'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    mode: NODE_ENV,

    context: path.resolve(__dirname, 'frontend'),

    entry: {
        reactSpending: './reactSpending/index.js',
        reactCategory: './reactCategory/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'static/build'),
        filename: '[name].js'
    },

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === 'development' ? 'inline-source-map' : false,

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
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
            test: /\.css$/,
            include: path.resolve(__dirname, 'frontend'),
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader"
            ]
        }, {
            test: /\.svg$/,
            include: path.resolve(__dirname, 'frontend'),
            loader: 'svg-inline-loader?removeSVGTagAttrs=false'
        }]
    }
};

if (NODE_ENV === 'production') {
    module.exports.optimization = {
        minimizer: [
            new UglifyJsPlugin(),
            new OptimizeCSSAssetsPlugin()
        ]
    };
}
