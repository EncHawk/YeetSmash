if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');


// const PORT = (process.env.PORT || 2000) ;

const indexRouter = require('./routes/index');

app.set('view engine' , 'ejs');
app.set('views', __dirname+'/views');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.use(express.static('public'));


const mongoose= require('mongoose');  
mongoose.connect(process.env.DATABASE_URL, {});
const db = mongoose.connection;
db.on('error' , (error)=>{console.error(error);});
db.once('open', ()=>{console.log('connected to mongoose')})

app.get('/', indexRouter); // put the landing page here:
app.get('/:id', indexRouter);// we need a few routes, 

app.listen(process.env.PORT || 3000 ,()=>{
  console.log(`hot in localhost:${8080}`);
})


// app.use(express.json());
// app.get('/', (req,res)=>{
//   console.log(req.headers);
//   res.send('<h1> Hello from the other side.</h1>');
// });

// app.listen(PORT,()=>{
//   console.log(`running on http://localhost:${PORT}`);
// });