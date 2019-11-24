import axios from 'axios';
import { GET_SALES, SALES_LOADING } from './types';
import createHeader from './createHeader';

export const getSales = () => (dispatch, getState) => {
	console.log("get sales stats..")
	// create header
	const config = createHeader(getState().auth.token);

	dispatch({type:SALES_LOADING});

	axios.get('api/dsales/',config)
	 	.then(daily => {
	 		axios.get('api/msales/', config)
	 			.then(monthly => {
	 				axios.get('api/ysales/', config)
	 					.then( yearly => {
	 						dispatch({
	 							type: GET_SALES,
	 							payload: {
	 								daily:daily.data, 
	 								monthly:monthly.data, 
	 								yearly:yearly.data
	 							}
	 						})
	 					})
	 			})
	 	})
		.catch(err => {
			dispatch(createError(err.response))
		})
}



