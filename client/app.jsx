import React, {useState, useEffect} from 'react';
import './app.css';

dotenv.config();
const API_URL = process.env.NODE_ENV === 'production'
? ''
: 'http:localhost:8080' // if its in dev we host it in 8080, in production its on the same port
// ejs magic