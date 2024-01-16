import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Posting from '../Posting/Posting';
import utilObj from '../../appWrite/util';

function Post() {

	const identifier =useParams();
	const [data,setData] =useState(null);
	console.log(identifier,  identifier.id,identifier.id == "addPost")
	useEffect(()=>{
		
		if(identifier && !(identifier.id == "addPost"))
		{
			utilObj.GetBlog(identifier.id).
			then((item)=>setData(item))
			.catch((err)=>console.error('this',err));
		}
		else{
			setData(null)
		}
	},[])
  return (<>
	
	<Posting post={data}
			 />
	</>
  )
}

export default Post