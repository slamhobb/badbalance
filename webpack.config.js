'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    context: __dirname + '/frontend',

    entry: {
        spending: './index',
    },

    output: {
        path: 'static/built',
        filename: '[name].js'
    },

    // watch: true,
    //
    // watchOptions: {
    //     aggregateTimeout: 100
    // },

    devtool: 'cheap-inline-module-source-map',

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })//,
        // new webpack.optimize.UglifyJsPlugin({
        //     warnings: false,
        //     drop_console: true,
        //     unsafe: true
        // })
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
        }]
    }

};
