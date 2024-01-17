import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

function RTE({name, control,label,defaultValue="",readOnly=false}) {
  return (
	<div className='w-1/2'>
		{label && <label className="text-lg font-bold font-mono h-10 w-12 inline-block text-left mr-10">{label}</label>}
		<Controller 
			name={name || 'content'}
			control={control}
			render={({field: {onChange}})=>(
				<Editor
					initialValue={defaultValue}
					init={{
						initialValue:{defaultValue},
						height:500,
						menubar:true,
						plugins: [
							'advlist autolink lists link image charmap print preview anchor',
							'searchreplace visualblocks code fullscreen',
							'insertdatetime media table paste code help wordcount'
						  ],
						  toolbar: 'undo redo | formatselect | ' +
						  'bold italic backcolor | alignleft aligncenter ' +
						  'alignright alignjustify | bullist numlist outdent indent | ' +
						  'removeformat | help',
						  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
						  
					}}
					onEditorChange={onChange}
				/>
			)}
		/>
	</div>
  )
}

export default RTE