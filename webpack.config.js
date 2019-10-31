'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AutoPrefixer = require('autoprefixer');

module.exports = {
    mode: NODE_ENV,

    context: path.resolve(__dirname, 'frontend'),

    entry: {
        spending: './spending/index.js',
        category: './category/index.js',
        debt: './debt/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'static/build'),
        filename: '[name].js'
    },

    watch: NODE_ENV === 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === 'development' ? 'inline-source-map' : false,

    plugins: [
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
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        sourceMap: NODE_ENV === 'development',
                        plugins: [
                            AutoPrefixer
                        ]
                    }
                }
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
