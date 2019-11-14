import { routePrefix } from '../../configServer';

const path = require("path");

export const handlerFolderPath = path.join(__dirname, '../../app/controller/testController') 

export const  routes =[
    {
        method:"get",
        endpoint:"/",
        handler:"simpleTest",
        routePrefix: routePrefix,
    }
]