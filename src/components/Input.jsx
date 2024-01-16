import React from 'react'

import { forwardRef } from 'react'


const Input =forwardRef(({label,
							type="text",
							className="",
							...props
							},ref)=>(
								<div className="w-full my-10 border-blue-500">

									{label && <label className="text-lg font-bold font-mono h-10 w-12 inline-block text-left mr-14">{label}</label>}
									<input type={type} className={`p-2 border-2 border-purple-400 w-56 h-8 rounded-lg text-black
									 ${className} `} {...props}  ref={ref}/>
								</div>

							))

export default Input