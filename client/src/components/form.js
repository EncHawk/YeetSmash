import {useState}  from 'react';

const API_URL = process.env.NODE_ENV === 'production'
? '/api'
: 'http://localhost:8080'


export default function Form(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e)=>{
  e.preventDefault();
  const name = document.querySelector('.name-input').value;
  const email = document.querySelector('.email-input').value;
  
  try{
    const response = await fetch (`${API_URL}/userEntry`,{
    method : "POST",
    headers : {"content-type" : "application/json"},
    body : JSON.stringify({name, email})
  });
  const data = await response.json;
  console.log(data.message);
  console.log('data must be above, im under it');
  }
  catch(err){
    setError(`${err.message}`);
  }
  

}

  return(
    <form onSubmit={handleSubmit}>
      {error && <p>{error.message}</p>}
      <div className='input-divs'>
        <input 
        className="name-input " 
        type="text" 
        value={name} 
        placeholder=" full name"
        onChange={
          (e) =>{
            setName(e.target.value);
          }
        }
        />   
        <input  
        className="email-input " 
        type="email" 
        value={email} 
        placeholder=" email" 
        onChange={
          (e) =>{
            setEmail(e.target.value);
          }
        } />
        <button className="submit-button" type="submit">submit</button>
      </div>
    </form>
  );
}

