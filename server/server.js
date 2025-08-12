// if(process.env.NODE_ENV !== 'production'){
//     const dotenv =
// }
 require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// we need cors when we are in development to have both port 3000 and react port to 
// connect and share data

if(process.env.NODE_ENV !== "production"){ 
  app.use(cors({
    origin: 'http://localhost:3000', // the server where react runs.
    credentials: true
  }));
}

app.use(express.json());


// const expressLayouts = require('express-ejs-layouts');
// const PORT = (process.env.PORT || 2000) ;
// const indexRouter = require('./routes/index');
// app.set('view engine' , 'ejs');
// app.set('views', __dirname+'/views');
// app.use(expressLayouts);
// app.set('layout', 'layouts/layout');
// app.use(express.static('public'));


// all the rendering is handled by React, we just use this as an api to send json data to React.

const mongoose= require('mongoose');  
mongoose.connect(process.env.DATABASE_URL, {});
const db = mongoose.connection;
db.on('error' , (error)=>{console.error(error);});
db.once('open', ()=>{console.log('connected to mongoose')})


// app.get('/', indexRouter); // put the landing page here:
// app.get('/:id', indexRouter);// we need a few routes, 

const apiRouter = require('./routes/api');
app.use('/', apiRouter);

// if its production it runs on the same port, express renders the static files.
if(process.env.NODE_ENV === 'production'){ 
  app.use(express.static(path.join(__dirname, './client/build'))); // to have react stuff be broken into static js 
  app.get('*',(req,res)=>{
    console.log(req.statusCode);
    res.sendFile(path.join(__dirname, './client/build/index.html'));
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