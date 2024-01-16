import React, { useCallback, useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import Input from '../Input'
import RTE from '../Header/RTE'
import utilObj from '../../appWrite/util'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { formatDistanceToNow } from 'date-fns';

function Posting({post}) {
	
  	const timeElapsed = formatDistanceToNow(post?post.$updatedAt: new Date(), { addSuffix: true });
	const [editable,setEditable]= useState(true);
	const [adminFlag,setAdminFlag] =useState(false);
	console.log('thisis post',post)
	const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.Title || "",
            identifier: post?.$id || "",
            content: post?.Content || "",
            status: post?.Status || "active",
        },
    });

	console.log('geval',getValues())
	const navigate =useNavigate();
	const userData = useSelector((state)=>state.userData)

	const submit =async (data)=>{
		if(post){
			console.log(data)
			const file =data.image[0] ? await utilObj.UploadFile(data.image[0]) :null;
			console.log('file',file)
			if(file){
				//deleting older image
				await utilObj.DeleteFile(post.Image);
			}
			const dbpost= await utilObj.UpdateBlog(post.$id,{...data,image:file?file.$id:undefined})

			if(dbpost){
				navigate(`/`)
			}
		}
		else{
			console.log('else')
			const file= data.image[0] ? await utilObj.UploadFile(data.image[0]) :null;
            console.log('file',file)
			if(file){
				console.log('submit',data)
				const dbpost= await utilObj.CreateBlogPost({...data,image:file.$id,userId:userData.$id})

				if(dbpost){
					navigate(`/`)
				}
			}
		}
	};

	const createIdentifier = useCallback((value) => {
		if(value &&  typeof value === 'string') 
			return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-")
			.replace(/\s/g, "-");

			return "";

	},[])


	useEffect(() => {
		const subscription= watch((value,{name})=>{
			if(name === "title"){
				setValue("identifier",createIdentifier(value.title),{shouldValidate:true})
			}
		})
		return ()=> subscription.unsubscribe();

	}, [watch,createIdentifier,setValue,post]);
	
	useEffect(()=>{
		setValue("title", post?.Title || "");
		setValue("identifier", post?.$id || "");
		setValue("content", post?.Content || "");
		setValue("status", post?.Status || "active");



		//updating admin flag if current user and post created by matches...
		if(post && userData && post.UserId==userData.$id){
			setAdminFlag(true);
		}
		if(post && !adminFlag){
			setEditable((prev)=>!prev);
		
		}
	},[post,userData])

	const deletePost= async()=>{
		try{
			await utilObj.DeleteFile(post.Image);
			const postData = await utilObj.DeleteBlog(getValues("identifier"))
			if(postData){
				navigate('/')
			}
		}
		catch(error){
			console.log(error);
		}
	}
	console.log('admin flag ',adminFlag)
  return (
	<div  className=" my-10 py-10 w-full bg-slate-500  bg-opacity-5 h-5/6 shadow-2xl">
		 <h2 className='text-purple-500 font-bold text-3xl font-mono'>
			{!post?`Create New Post`:`Post last Updated on ${timeElapsed}`} </h2>
	<form onSubmit={handleSubmit(submit)}>
	<div className="flex items-center">
	
		<Input placeholder="Enter Post title"
               type="text"
               label="title"
			   readOnly={!editable}
			//    value={post?post.Title:''}
               {...register("title",{
                          required: true
               })}
        />
		<Input 
			label ="Identifier"
			placeholder="Identifier"
			// value={post?post.$id:''}
			readOnly={true}
			className="border-white text-black "
			{...register("identifier",{required: true})}
			onInput={(e)=>{
				setValue("identifier",createIdentifier(e.target.value),{shouldValidate:true})
			}}
		/>
		{ adminFlag &&
		<button onClick={() => setEditable((prev)=>!prev)} className=' mt-5 bg-purple-700 text-white font-sans font-bold hover:bg-white hover:text-purple-800 border-2
							hover:border-2 hover:border-black p-3 rounded-2xl'
							type='button'>{editable?'Save':'Edit'}</button>
		}
		{adminFlag && <button className=' mt-5 bg-purple-700 text-white font-sans font-bold hover:bg-white hover:text-purple-800 border-2
							hover:border-2 hover:border-black p-3 rounded-2xl'
							type='button' onClick={deletePost}>Delete</button>
		}	
		</div>
		<RTE  label="Content" name="content" control={control} defaultValue={getValues("content")}
			  />
		
		<div className="flex">
		
			<Input label="Image"
				   type="file"
				   readOnly={!editable}
				   disabled ={!editable}
				   accept="image/png, image/jpg, image/jpeg, image/gif"
				   {...register("image",{required : !post})}
				   className=" "
			/>
			{post && (
					<img className="w-48 h-48 mr-9"
						src={utilObj.getFilePreview(post.Image)}
						alt={post.title}

					 />
			)}
		</div>
		<label className="text-lg font-bold font-mono h-10 w-12 inline-block text-left mr-10">Status</label>
			<select disabled={!editable} readOnly={!editable} {...register("status")}>
				<option value="active">Active</option>
				<option value="inactive">InActive</option>
			</select>
			
		{((adminFlag && editable) || !post) && 
		<button className=' mt-5 bg-purple-700 text-white font-sans font-bold hover:bg-white hover:text-purple-800 border-2
						   hover:border-2 hover:border-black p-3 rounded-2xl' type='submit'>Submit</button>
		
		}
		</form>
	</div>
  )
}

export default Posting