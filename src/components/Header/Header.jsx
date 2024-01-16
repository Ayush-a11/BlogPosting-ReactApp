import React from 'react'
import { useSelector } from 'react-redux'
import authObj from '../../appWrite/auth'
import {  Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton';


function Header() {

  // const selector = useSelector();

  const authstate=useSelector((state)=>state.loggedIn)
  console.log(authstate)
  const navItems =[
    {
      name:'Home',
      path:'',
      Active: authstate
    },
    {
      name:'Create Post',
      path:`/Post/addPost`,
      Active: authstate
    },
    {
      name:'Login',
      path:'/Login',
      Active: false
    },
    {
      name:'SignUp',
      path:'/SignUp',
      Active: false
    },
  ]


  return (
	<div className="w-full h-20  border-b-2  mb-8 border-purple-800 shadow-xl">
    <nav className='flex justify-between item-center p-4'>
    <Link   to='/'>
      <div className=" "><img className="w-32 h-20 pb-5 "src= "https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png"/></div>
      </Link>
      <ul className="flex item-center space-x-5">
        {navItems.map((item)=>(
          <Link key={item.name}  to={item.path}>
          {item.Active && <li className=' text-purple-500 text-xl  font-bold'>{item.name}</li>}
          </Link>
        ))}
      </ul>

      <ul>
        <li>

        {authstate?<LogOutButton/> :
          <>
            <Link to='/Login'>
            <button  className=' border-2 border-purple-600  text-purple-600 font-mono font-bold hover:bg-purple-600 hover:text-black 
						   hover:border-2 hover:border-black p-4 rounded-2xl mx-2'>&nbsp;LogIn</button>
            </Link>
            <Link to='/SignUp'>
            <button  className=' border-2 border-purple-600  text-purple-600 font-mono font-bold hover:bg-purple-600 hover:text-black 
						   hover:border-2 hover:border-black p-4 rounded-2xl'>&nbsp;SingUp</button>
            </Link>
          </>
        }
        </li>
      </ul>
    </nav>
  </div>
  )
}

export default Header