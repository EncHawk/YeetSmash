const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
  // res.send("coming from wds' mern course");
  res.render('index'); // give the ejs file that needs to be displayed.
});

router.get('/:id', (req, res)=>{
  const id = req.params.id; // look into the params and find 'id'
  res.send(`welcome, now time to get kicked id: ${id}`);
});

module.exports = (router)