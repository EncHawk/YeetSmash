import React, {useState, useEffect} from 'react';
import './app.css';
import Form from './components/form.js';

// require('dotenv').config();
// const API_URL = process.env.NODE_ENV === 'production'
// ? '/'
// : 'http://localhost:8080' // if its in dev we host it in 8080, in production its on the same portvejs magic

// const fetchUsers = async ()=>{
    
//     try{
//       const response = await fetch (`${API_URL}/users`);
//     // if we dont get our data
//     if(!response.ok){
//       throw new Error(`HTTP error occured : ${response.status}`);
//     }
//     //if we get the data back 
//     const data = await response.json();
//     console.log('received data from express to react');
//     // this confirms that the server and react are working fine
//     // when we receive the data from the backend, update the setUsers state
//     setUsers(data.users || [{id:1 , name:"dilip"} , {id:2 , name:"pilid"}]);
//     }
//     catch (err){
//       setError(`following error occured: ${err}`);
//       console.log(`new error came up ${err.message}`);
//     }
//     finally{
//       setLoading(false);
//     }
//   }
// to test the database's values we just need to call this fn.


function App(){
  // const [users, setUsers] = useState([]); // a list of users that will be retrieved from mongo
  const [loading, setLoading] = useState(false); // shit is still loading for the frontend from react
  const [error, setError] = useState(null);

    

  useEffect(()=>{
    setLoading(false);
    setError(null);
  },[]);
  
  return (
    <div>
      <div className="outer-div">
        {/* if loading ->true then it'll load else it wont.  */}
        {loading && <p>loading data...</p> }         
        {error && <p>error! {error.message}</p>}
      </div>
      <div className="hero-section">
        <h1 className="hero-text">
          Wanna Rate your peers as an anon? 
          <br/>
          About time you joined the <span className='waitlist'>WAITLIST</span> then!
        </h1>
      </div>
      <div className="input-container">
            <Form/>
      </div>
    </div>
  );
}

export default App;