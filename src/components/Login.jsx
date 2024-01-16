import React from 'react'
import { logIn as StoreLogin } from '../store/authSlice' 
import authObj from '../appWrite/auth'
import { useForm } from "react-hook-form"
import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Input from './Input'
import { useDispatch } from 'react-redux'

function Login() {
  
  const dispatch =useDispatch()
  const navigate = useNavigate();
  const {register,handleSubmit}= useForm();
  const [error,setError] = useState(null);

  const loginUser =async(data)=>{
   setError("");
   try{
      const session = await authObj.LogIn(data);
      if(session){
        console.log('hi')
        const data= await authObj.GetCurrentUser();
        
        if(data){
          dispatch(StoreLogin(data))
          navigate('/')
        }
      }
   }catch(error){
    setError(error);
   }

  }
  console.log('error login',error)
  return (
	<div className=" my-10 py-10 w-full bg-slate-500  bg-opacity-5 h-5/6 shadow-2xl"> 
      {error && <h1 className="text-red-800 font-bold">{error}</h1>}

      <h2 className='text-purple-500 font-bold text-3xl font-mono'>Login To Your Account</h2>

      
      <form onSubmit={handleSubmit(loginUser)}>
        <Input placeholder="Enter your email"
               type="email"
               label="Email"
               {...register("email",{
                          required: true,
                          validate:{
                            MatchPattern: (value)=>/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.
                            test(value)||"Email must be a valid email address",
                          }
               })}
        />
        <Input placeholder="Enter your password"
               type="password"
               label="Password"
               {...register("password",{required:true,})}/>

      <Link to='/SignUp'>
      <h2 className='text-blue-800 font-bold font-mono'>Don't have account ?</h2>
      </Link>

        <button className=' mt-5 bg-purple-700 text-white font-sans font-bold hover:bg-white hover:text-purple-800 border-2
						   hover:border-2 hover:border-black p-3 rounded-2xl' type='submit'>Log-In</button>
      </form>



  </div>
  )
}

export default Login