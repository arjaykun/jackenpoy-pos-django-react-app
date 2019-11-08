import { combineReducers } from 'redux'
import itemsReducer from './itemsReducer';
import errorsReducer from './errorsReducer';
import messagesReducer from './messagesReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';

export default combineReducers({
	items: itemsReducer,
	cart: cartReducer,
	order: orderReducer,
	errors: errorsReducer,
	messages: messagesReducer,
});