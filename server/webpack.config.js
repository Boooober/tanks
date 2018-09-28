const path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    context: path.resolve(__dirname, 'src'),
    target: 'node',
    entry: './',
    output: {
        path: path.resolve(__dirname, '../build/'),
        filename: '[name].js',
        publicPath: '/'
    },
    externals: nodeModules,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            Modules: path.resolve(__dirname, 'src/game/modules'),
        }
    }
};
