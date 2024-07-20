import React,{ useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../UserContext';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Redirect, setRedirect] = useState(false);
  const [passVis,setpassVis]=useState(false);
  const {setUser,setReady} = useContext(UserContext);

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', {
          email,
          password} 
      );
      
      setUser(response.data);
      setReady(true);
      console.log('Login successful:', response.data);
      setRedirect(true);
      alert('Login Successful');
  } catch (error) {
    console.error('Error:', error);
    console.error('Error response:', error.response);
    const errorMessage = error.response && error.response.data ? error.response.data.message : 'Login Failed';
    alert(errorMessage);
  }
  }
  if (Redirect){
    return <Navigate to ={'/'}/>
  }
  
  return (
    <div className=' bg-bg min-h-screen grow flex items-center justify-around'>
    <div className='mb-64' >
    <h1 className='text-4xl text-center text-text gap-y-5 mb-4'>Login</h1>
    <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit} >
    
       <input type ="email" placeholder="your@email.com" onChange={(e) => {setEmail(e.target.value)}}/>
      <div className='relative '>
      <input type ={passVis ? "text":"password"} placeholder="password" onChange={(e) => {setPassword(e.target.value)}}/>
      <button type="button" className='absolute right-2 top-4' onClick={()=>setpassVis(!passVis)}>
                            {passVis ? 'Hide' : 'Show'}
                        </button>
      </div> 
       <button className='primary'>Login</button>
       <div className='text-center py-2 text-gray-500'>
        Don't have an account yet?  
        <Link className='text-bold text-black' to='/register'>  SignUp Now </Link>
       </div>
    </form>
    </div>
    </div>
  )
}

export default LoginPage