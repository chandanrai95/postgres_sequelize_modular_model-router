
import  {config}  from "./configServer";
import { schema } from './configServer';
import {getInstance } from './app/helper/ModelInstanceHelper';
import routerLogger from './app/helper/routerLogger';
import UserData from './data/UserData';

const express = require("express");
const Sequelize = require("sequelize");
const path = require("path");
const fs = require("fs");
const app = express();



const connection = new Sequelize(config.dbname, config.username, config.password , {
    dialect: config.dialect
})

app.sequelizeClient = connection;

//------------------------------------------------------------ schema import--------------------------------------------------// 
const Modelpath=path.join(__dirname, "./sequelizeSchema"); // this line is use to get path to sequelizeSchema like: c://file/file/seq

const files = fs.readdirSync(Modelpath); // this line is use to get filename inside sequelizeSChema folder

files.map(file =>  {
    file = Modelpath + '/' +file;
    if(!fs.statSync(file).isDirectory()) // this is use to check if it is not folder or directory
    {
        require(file).default(app)  // this is use to import model in app.js
    }
}) 
//------------------------------------------------------------ schema import--------------------------------------------------//


//------------------------------------------------------------ routes import--------------------------------------------------//

const routePath = path.join(__dirname, "./routes/v1");

const routefiles = fs.readdirSync(routePath);

 routefiles.map(file => {
     const filePath = routePath + "/" +file;

    if(!fs.statSync(filePath).isDirectory())
    {


     const routerFileInstance = require(filePath);
     const handlerFileInstance = require(routerFileInstance.handlerFolderPath);
     const routes = routerFileInstance.routes;

     for( let route of routes)
     {
         let method = route.method;
         let endpoint = route.routePrefix + "/" +route.endpoint;
         let handler = handlerFileInstance[route.handler];

         app[method](endpoint, handler);
        routerLogger(method, endpoint)
     }
    }
})
//------------------------------------------------------------ routes import--------------------------------------------------//


//------------------------------------------------------------ models--------------------------------------------------//

const Users = getInstance(schema.USERS); 
const Posts = getInstance(schema.POSTS);

Users.hasMany(Posts, { as : "posts"})
//------------------------------------------------------------ models--------------------------------------------------//


connection.sync({
    logging: console.log,
    force: false
})
.then(() => {
    console.log("Connection to database is established ");
    app.listen(config.port, function(){
        console.log("Server running on Port ", config.port)
    })
})
.then(() => {
    // Users.bulkCreate(UserData)  // use to feed data in table
})
.catch(err => {
    console.log("error Occured",err)
})

