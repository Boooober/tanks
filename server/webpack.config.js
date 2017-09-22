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
    entry: './server.ts',
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
            Loader: path.resolve(__dirname, 'src/loader'),
            Core: path.resolve(__dirname, 'src/game/core'),
            Common: path.resolve(__dirname, '../common'),
            Modules: path.resolve(__dirname, 'src/game/modules'),
            Constants: path.resolve(__dirname, 'src/game/constants')
        }
    }
};
