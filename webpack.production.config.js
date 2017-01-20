var Webpack = require('webpack');
var path = require('path');
var webpackConfig = require("./webpack.config.js");
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var publicPath = path.resolve(__dirname, 'public');
var deployRoot = path.resolve(__dirname, 'docs');
var deployPath = path.resolve(__dirname, 'docs','webpack_build');
var mainPath = path.resolve(__dirname, 'src', 'ractivePOC', 'entry.js');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var config = {
    devtool: 'source-map',
    entry: [
        path.resolve(__dirname, 'src', 'ractivePOC', 'components', 'main', 'main.scss'),
        mainPath
    ],
    output: {
        path: deployPath,
        filename: 'bundle.js'
        // publicPath: '/webpack_build/'
    },
    resolve: webpackConfig.module.resolve,
    module: {
        loaders: webpackConfig.module.loaders.map(loader => {
            if (loader.loader == "style-loader!css-loader!sass-loader")
                loader.loader = ExtractTextPlugin.extract('style', 'css!sass');
            return loader;
        })
    },
    plugins: [
        new CleanWebpackPlugin([deployPath], {
            verbose: true,
            dry: false,
            allowExternal: true
        }),
        new Webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new Webpack.optimize.UglifyJsPlugin(),
        new CopyWebpackPlugin([{from: publicPath, to: deployRoot}]),
        new ExtractTextPlugin("styles.css")
    ]
};
module.exports = config;