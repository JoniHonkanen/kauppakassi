var path = require('path');

const webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,  //kay kaikki js tiedostot lapi
                exclude: /node_modules/, //paitsi nodemodule kansiosta
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            }
        ]
    }
}