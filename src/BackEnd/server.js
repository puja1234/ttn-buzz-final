'use strict';
const express = require('express');
const webpack = require('webpack');
const webconfig = require('../../webpack.config');
const webpackMiddleware = require('webpack-dev-middleware');

let mailerDemo = require('./mailer');
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
}));  //middleware to start react server

require('./config/dataSource');
route(app);

/*process.on('uncaughtException',(err)=>{
    console.log("error occured****************",err);
    mailerDemo.send("pooja19goyal@gmail.com");
});  // send mail whenever error is there

process.on('SIGINT',()=>{
    console.log("server stopped");
    mailerDemo.send("pooja19goyal@gmail.com");
});   //send mail when server is down*/

app.listen(3000,()=>{
    console.log("server is up and running on port 3000");
}); //server listening to port 3000



