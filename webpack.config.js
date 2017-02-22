'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname + '/frontend',

    entry: {
        spending: './spendings',
        category: './category'
    },

    output: {
        path: 'static/built',
        filename: '[name].js'
    },

    watch: NODE_ENV == 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    //devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,
    devtool: NODE_ENV == 'development' ? 'source-map' : null,

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new ExtractTextPlugin('[name].css')
    ],

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    module: {
        loaders: [{
            test:   /\.js$/,
            loader: 'babel',
            include: __dirname + '/frontend',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.pug$/,
            loader: 'pug'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css')
        }]
    }

};


if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            warnings: false,
            drop_console: true,
            unsafe: true
        })
    );
}
