'use strict';

const express = require('express');
const webpack = require('webpack');
const multer = require('multer');
const webconfig = require('../../webpack.config');
const webpackMiddleware = require('webpack-dev-middleware');
const route = require('./routers/route');

const app = express();
app.use('/files',express.static('files'));
const compiler = webpack(webconfig);
app.use(webpackMiddleware(compiler,{
    hot:true,
    publicPath:'/',
    stats:{
        color:true,
    },
    historyApiFallback:false
}))

require('./config/dataSource');

route(app);

app.listen(3000,()=>{
    console.log("Server is up and running at port 3000");
})
