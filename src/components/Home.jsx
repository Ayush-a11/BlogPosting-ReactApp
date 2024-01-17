import React, { useEffect, useState } from 'react'
import utilObj from '../appWrite/util'
import Card from './Card';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function Home() {
	const [allPost,setAllpost] =useState([]);
	const selector = useSelector((state)=>state.loggedIn);
	const navigate=useNavigate();
	console.log(selector)
	useEffect(() => {
		const getData = async () => {
		  try {
			const res = await utilObj.GetAllPost();
			console.log(res.documents);
			setAllpost(res.documents);
			console.log(typeof res.documents, res.documents);
		  } catch (error) {
			console.error("Error fetching data:", error);
		  }
		};
		
	  
		

		if(!selector){
			navigate('/Login');
		}
		else{
			getData();
		}
	  }, []);

  return (
	<div className=" my-10 py-10 w-full flex-col items-center justify-center bg-slate-500  bg-opacity-5  shadow-2xl">

		{!allPost.length >0 ? (<h2>No Post Exist</h2>):
		(
		<div className="border-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mx-14">
			{allPost.map((item) =>(
				<>
				<div key={item.$id}>
				<Card identifier={item.$id}
					  title={item.Title}
					  fileId={item.Image}/>
				</div>
				</>
				
			))}
		</div>
		) }
	</div>
  )
}

export default Home