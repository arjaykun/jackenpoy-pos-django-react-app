import { GET_SALES, SALES_LOADING } from '../actions/types.js';

const initialState = {
	daily_sales: [],
	monthly_sales: [],
	yearly_sales: [],
	loading: false,
};

export default function(state=initialState, action) {
	switch(action.type) {
		case SALES_LOADING:
			return {
				...state,
				loading: true
			}
		case GET_SALES:
			return {
				daily_sales: action.payload.daily,
				monthly_sales: action.payload.monthly,
				yearly_sales: action.payload.yearly,
				loading: false,
			}
		default:
			return state;
	}
}