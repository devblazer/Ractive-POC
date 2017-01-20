var Webpack = require('webpack');
var path = require('path');
var appPath = path.resolve(__dirname, 'src', 'ractivePOC');
var deployPath = path.resolve(__dirname, 'docs','webpack_build');

var config = {
    context: __dirname,
    devtool: 'eval-source-map',
    entry: [
        path.resolve(appPath, 'entry.js')],
    output: {
        path: deployPath,
        filename: 'bundle.js',
        publicPath: '/webpack_build/'
        // publicPath: '/cp/cool_report_1/'
    },
    resolve: {},
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_modules[\\\/]+(?!react-icons)|bower_components)/,
                query: {
                    presets: ['es2015', 'stage-2']
                }
            },
            {
                test: /\.(mustache|hbs)$/,
                loader: "ractive",
            },
            {
                test: /\.s?css$/,
                loader: "style-loader!css-loader?sourceMap&localIdentName=[local]--[hash:base64:5]!sass-loader",
            },
            {test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
            {test: /\.json/, loader: "json-loader"},
            {test: /\.png/, loader: "url-loader?limit=100000&mimetype=image/png"},
            {test: /\.gif/, loader: "url-loader?limit=100000&mimetype=image/gif"},
            {test: /\.jpg/, loader: "file-loader"},
            {test: /\.svg/, loader: "url-loader?limit=10000"},
            {test: /\.woff/, loader: "url-loader?limit=100000"},
            {test: /\.woff2/, loader: "url-loader?limit=100000"},
            {test: /\.ttf/, loader: "file-loader"},
            {test: /\.eot/, loader: "file-loader"}
        ]
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = config;