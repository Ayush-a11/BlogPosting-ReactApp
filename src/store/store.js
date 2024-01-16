import { configureStore } from '@reduxjs/toolkit';
import reducers from '../store/authSlice'

const store= configureStore(
				{
					reducer:reducers
				}
			);


export default store;

