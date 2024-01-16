import { createSlice } from "@reduxjs/toolkit";
import authObj from "../appWrite/auth";

const initialState={
		userData:null,
		loggedIn: false
}

const authSlice = createSlice({
		name:'auth',
		initialState,
		reducers:{
			logIn(state,action){
				//  authObj.LoginIn(action.email,action.password).
				// then((data)=>
				// 	console.log(data)
				// )
				// .finally(() =>state.loggedIn = true)
				state.userData=action.payload;
				state.loggedIn=true;
			},
			logOut(state){
				state.loggedIn=false;
			}
			
		}
	}
	)


export const {logIn,logOut} = authSlice.actions;

const reducers =authSlice.reducer;

export default reducers
