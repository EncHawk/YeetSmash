import React, {useState, useEffect} from 'react';
import './app.css';

require('dotenv').config();
const API_URL = process.env.NODE_ENV === 'production'
? ''
: 'http:localhost:8080' // if its in dev we host it in 8080, in production its on the same port
// ejs magic

function App(){
  const [users, setUsers] = useState([]); // a list of users that will be retrieved from mongo
  const [loading, setLoading] = useState(False); // shit is still loading for the frontend from react
  const [error, setError] = useState(null);

  const fetchUsers = async ()=>{
    setLoading(true);
    setError(null);
    try{
      const response = await fetch (`${API_URL}/api/client`);
    // if we dont get our data
    if(!response.ok){
      throw new Error(`HTTP error occured : ${response.status}`);
    }
    //if we get the data back 
    const data = await response.json();
    console.log('received data from express to react');
    // this confirms that the server and react are working fine
    // when we receive the data from the backend, update the setUsers state
    setUsers(data.users || []);
    }
    catch (err){
      setError(`following error occured: ${err.message}`);
      console.log(`new error came up ${err}`);
    }
    finally{
      setLoading(false);
    }
  }  
  
  return (
    <div>
      {loading && <p>loading...</p>}
      {error && <p>error! {error}</p>}

      <ul>
        {users.map((u, id)=>{
          <li key= {id}>
            {u.name}
          </li>
        })}
      </ul>
    </div>
  );
}