var express = require("express");
var mysql = requrie("mysql");
var http = require("http")

var server = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'matsuoka',
    database:'toshin'
})
server.connect((err)=>{
    if(err){
        console.log(err);
        return;
    }
    
})