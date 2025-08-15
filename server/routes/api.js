// routes/api.js - Convert your old routes to API endpoints
// Example: Convert your old index route to API
// Old: app.get('/', indexRouter) rendered EJS
// New: API endpoint that returns JSON}


import express from 'express';
const apiRouter = express.Router();
import userW from '../models/usersModels.js';

// GET /api/home - Homepage data
// deals with the requests that are made in the home page, i.e landing page
apiRouter.get('/', (req, res) => {
  // Instead of res.render(), return JSON data
  res.json({
    success: true,
    data: {
      title: 'YeetSmash',
      message: 'Welcome to the homepage!',
      timestamp: new Date().toISOString()
    }
  });
});

apiRouter.get('/users', async (req, res) => {
  try {
    // configure mongo, get users inside the users array then sent it to react
    // const users = await User.find();

    const users = await userW.find({}); // returns all since {empty}
    
    res.json({
      success: true,
      users: users
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
    return;
  }
});

apiRouter.post('/userEntry', async(req, res)=>{
  const {name, email} = req.body;
  if(!name || !email){
    res.status(400).json({error: 'name and email fields are required!'});
    return;
  }
  
  const orgDomain = "@cmru.edu.in";
  if(!email.endsWith(orgDomain)){
    res.status(400).json({error: "need to be a CMRU user to enter!"});
    return;
  }
  try{
    const nUser = new userW({name, email});
    await nUser.save();
    res.json({message: "user was saved to db!"});
    return;
  }
  catch(err){
    res.status(500).json({error:"error saving the user! " +err.message});
    return;
  }
})



export default apiRouter;