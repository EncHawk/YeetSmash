// {
// if(process.env.NODE_ENV !== 'production'){
// //     const dotenv =
// // }
// //ES modules has no scope for __dirname, so we declare vars for it.
// // cant use require if we are using ESM modules, type: module->pjson
// // we need cors when we are in development to have both port 3000 and react port to 
// // connect and share data
// }
import dotenv from "dotenv";
import express, { urlencoded } from "express";
import path from 'path';
import cors from 'cors';

import { fileURLToPath } from 'url';

import apiRoutes from './routes/api.js' 
import connectDB from './config/db.js';
// import testConnection from "./testDB.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if(process.env.NODE_ENV !== "production"){ 
  app.use(cors({
    origin: 'http://localhost:3000', // the server where react runs.
    credentials: true
  }));
}

dotenv.config();

connectDB();
// testConnection();

app.use(urlencoded({extended:true}))
app.use(express.json());
// all the rendering is handled by React, we just use this as an api to send json data to React.

app.use('/', apiRoutes);

// if its production it runs on the same port, express renders the static files.
if(process.env.NODE_ENV === 'production'){ 
  app.use(express.static(path.join(__dirname, '../client/public'))); // to have react stuff be broken into static js 
  app.get('/*',(req,res)=>{
    console.log(req.statusCode);
    res.sendFile(path.join(__dirname, '../client/public/index.html')); // /build/.html to public / matching the directory.
  });
}
else{
  app.get('/', (req, res)=>{
    res.json({
      message: 'server is running fine, React is looking super fine in 3000',
      mode: 'dev'
    })
  });
}



app.listen( process.env.PORT || 8080, ()=>{
  console.log(`server running on port ${process.env.PORT}`);
  if(process.env.NODE_ENV==='production'){
    console.log('both react and api are using on the same port.'); 
  }
  else{
    console.log(process.env.NODE_ENV);
    console.log('react is lookin fire in 3000');
    console.log('server in 8080, all put together by CORS!🔥'); 
  }
});
