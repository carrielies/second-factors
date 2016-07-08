var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compressor: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([
            { from: 'node_modules/govuk_frontend_toolkit/images/seperator.png', to: 'dist/seperator.png'},
        ])
    ],
    module: {
        loaders: [
            {test: /\.js$/, loaders: ['react-hot', 'babel'], include: path.join(__dirname, 'src')},
            {test: /\.scss$/, loaders: ['style', 'css', 'sass' ]  },
            {test: /\.less$/, loaders: ['style', 'css', 'less']},
            {test: /\.gif$/, loader: "url-loader?mimetype=img/png"},
            {test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff"},
            {test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]"}
        ]
    }
};
