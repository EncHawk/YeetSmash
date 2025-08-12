// routes/api.js - Convert your old routes to API endpoints
const express = require('express');
const router = express.Router();

// Example: Convert your old index route to API
// Old: app.get('/', indexRouter) rendered EJS
// New: API endpoint that returns JSON

// GET /api/home - Homepage data
router.get('/', (req, res) => {
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

// GET /api/page/:id - Dynamic page data  
router.get('/page/:id', (req, res) => {
  const { id } = req.params;
  
  // Simulate getting page data (replace with real MongoDB query)
  const pageData = {
    id: id,
    title: `Page ${id}`,
    content: `This is the content for page ${id}`,
    author: 'YeetSmash Team'
  };
  
  res.json({
    success: true,
    data: pageData
  });
});

// Example: If you had user functionality
router.get('/users', async (req, res) => {
  try {
    // Replace with your actual User model
    // const users = await User.find();
    const users = [
      { id: 1, name: 'Test User', email: 'test@yeetsmash.com' },
      {id: 2 , name : 'arvid' , email : 'arvid@yeetmail.com'}
    ];
    
    res.json({
      success: true,
      users: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Health check for your API
// router.get('/health', (req, res) => {
//   res.json({
//     status: 'YeetSmash API is running!',
//     version: '0.1.0',
//     database: 'connected',
//     timestamp: new Date().toISOString()
//   });
// });

module.exports = router;