const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
context:path.join(__dirname,'src'),
    entry: './index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {
                test: /\.(png|jpg|jpeg|gif|webp|svg|ico)?$/,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                    ],
            },
            {
                test: /\.css$/,
                loader:'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './index.html',
        //     filename: 'index.html'
        // })
    ]

};
