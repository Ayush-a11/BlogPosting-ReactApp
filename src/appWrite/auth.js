import config from '../Config'
import {Client, Account,ID} from 'appwrite'

class Auth{

	client= new Client();
	account
	constructor(){
		console.log(config)
		this.client.setEndpoint(config.appWriteUrl).setProject(config.appWriteProjectId);

		this.account= new Account(this.client);
	}
    
	async GetCurrentUser(){
        try{
			return await this.account.get()
		}
		catch(error){
			console.log("Error Fetching Current User Data :: GetCurrentUser function", error);
		}
		
	}

	async SingUp({name,email, password}){
		try{
			console.log(this.account)
			const userId=ID.unique()
			await this.account.create(userId,email,password,name)
			//after creating account directly creating login session for user..

			await this.LogIn({email, password});

			return true;
		}
		catch(error){
			console.log("Error creating account :: SingUp Function", error);
		}
		return null;
	}

	async LogIn({email, password}){
		try{
			
			 await this.account.createEmailSession(email, password);
			 return true;

		}
		catch(error){
			console.log("Error creating account :: LoginIn Function", error);
		}
		return null;
	}

	async LogOut(){
		try{
			 this.account.deleteSessions();
			 return true;

		}
		catch(error){
			console.log("Error logging out :: LogOut Function", error);
		}
		return null;
	}

}

const authObj=new Auth();

export default authObj;