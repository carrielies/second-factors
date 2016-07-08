var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: "source-map",
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            },
            comments: false,
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            output: {comments: false},
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
    ],
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: [ 'babel'], include: path.join(__dirname, 'src')},
            {test: /\.scss$/, loaders: ['style', 'css', 'sass' ]  },
            {test: /\.less$/, loaders: ['style', 'css', 'less']},
            {test: /\.gif$/, loader: "url-loader?mimetype=img/png"},
            {test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff"},
            {test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]"}
        ]
    }
};
