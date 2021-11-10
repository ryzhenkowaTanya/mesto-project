const path = require('path');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },

    mode: 'development',
    plugins: [
        new htmlPlugin(
            { title: 'webpack dev server'}
        )
    ]
};