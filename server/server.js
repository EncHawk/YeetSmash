// if(process.env.NODE_ENV !== 'production'){
//     const dotenv =
// }
import dotenv from "dotenv";
import express from "express";
import path from 'path';
import cors from 'cors';
const app = express();

// built imports 
// cant use require if we are using ESM modules, type: module->pjson
 import apiRouter from './routes/api.js' 
import connectDB from './config/db.js';
// we need cors when we are in development to have both port 3000 and react port to 
// connect and share data

if(process.env.NODE_ENV !== "production"){ 
  app.use(cors({
    origin: 'http://localhost:3000', // the server where react runs.
    credentials: true
  }));
}

connectDB();

app.use(express.json());
// all the rendering is handled by React, we just use this as an api to send json data to React.
// app.get('/', indexRouter); // put the landing page here:
// app.get('/:id', indexRouter);// we need a few routes, 

app.use('/', apiRouter);

// if its production it runs on the same port, express renders the static files.
if(process.env.NODE_ENV === 'production'){ 
  app.use(express.static(path.join(__dirname, './client/build'))); // to have react stuff be broken into static js 
  app.get('*',(req,res)=>{
    console.log(req.statusCode);
    res.sendFile(path.join(__dirname, './client/public/index.html'));
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

const PORT = process.env.PORT;

app.listen( PORT || 8080, ()=>{
  console.log(`server running on port ${PORT}`);
  if(process.env.NODE_ENV==='production'){
    console.log('both react and api are using on the same port.'); 
  }
  else{
    console.log(process.env.NODE_ENV);
    console.log('react is lookin fire in 3000');
    console.log('server in 8080, all put together by CORS!🔥'); 
  }
});

// app.use(express.json());
// app.get('/', (req,res)=>{
//   console.log(req.headers);
//   res.send('<h1> Hello from the other side.</h1>');
// });

// app.listen(PORT,()=>{
//   console.log(`running on http://localhost:${PORT}`);
// });