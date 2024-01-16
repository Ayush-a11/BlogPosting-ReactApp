import React from 'react'
import { logIn as StoreLogin } from '../store/authSlice' 
import authObj from '../appWrite/auth'
import { useForm } from "react-hook-form"
import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Input from './Input'
import { useDispatch } from 'react-redux'



function SingUp() {

const dispatch =useDispatch()
const navigate = useNavigate();
const {register,handleSubmit}= useForm();
const [error,setError] = useState(null);

const SingUpUser =async(data)=>{
   setError("");
   try{
      console.log(data)
      const session = await authObj.SingUp(data);
      console.log('session',session)
      if(session){
        const data= await authObj.GetCurrentUser();
        console.log(data);
        if(data){
          dispatch(StoreLogin(data))
          navigate('/')
        }
      }
   }catch(error){
    setError(error);
   }

}

return (
	<div className=" my-10 py-10 w-full bg-slate-500  bg-opacity-5 h-5/6 shadow-2xl">
      {/* {error && <h1 className="text-red-800 font-bold">{error}</h1>} */}

      <h2 className='text-purple-500 font-bold text-3xl font-mono'>Create Your Account</h2>

     

      <form onSubmit={handleSubmit(SingUpUser)}>

	  <Input placeholder="Enter your Name"
               type="text"
               label="Name"
               {...register("name",{required:true,})}
               />

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
               {...register("password",{required:true,})}
          />
		 <Link to='/Login'>
      <h2 className='text-blue-800 font-bold font-mono'>Already have an account ?</h2>
      </Link>

        <button className=' mt-5 bg-purple-700 text-white font-sans font-bold hover:bg-white hover:text-purple-800 border-2
						   hover:border-2 hover:border-black p-3 rounded-2xl' type='submit'>Create Account</button>
      </form>



  </div>
  )
}

export default SingUp