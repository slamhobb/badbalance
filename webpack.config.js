'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'frontend'),

    entry: {
        reactSpending: './reactSpending/index.js',
        reactCategory: './reactCategory/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'static/built'),
        filename: '[name].js'
    },

    watch: NODE_ENV === 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === 'development' ? 'source-map' : false,

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        }),
        new ExtractTextPlugin('[name].css')
    ],

    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'frontend'),
            use: 'babel-loader'
        }, {
            test: /\.css$/,
            include: path.resolve(__dirname, 'frontend'),
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }, {
            test: /\.svg$/,
            include: path.resolve(__dirname, 'frontend'),
            loader: 'svg-inline-loader?removeSVGTagAttrs=false'
        }]
    }
};

if (NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}
