'use strict';
const express = require('express');
const webpack = require('webpack');
//const multer = require('multer');
const webconfig = require('../../webpack.config');
const webpackMiddleware = require('webpack-dev-middleware');
var mailerDemo = require('./mailer');

const route = require('./route');
const app = express();

app.use('/files',express.static('files'));
const compiler = webpack(webconfig);
app.use(webpackMiddleware(compiler,{
    hot:true,
    publicPath:'/',
    stats:{
        color:true,
    },
    historyApiFallback:true
}));

require('./config/dataSource');
route(app);


/*process.on('uncaughtException',(err)=>{
    console.log("error occured****************",err);
    mailerDemo.send("pooja19goyal@gmail.com");
});

process.on('SIGINT',()=>{
    console.log("server stopped");
    mailerDemo.send("pooja19goyal@gmail.com");
});*/


app.listen(3000,()=>{
    console.log("server is up and running on port 3000");
});



