import { combineReducers } from 'redux'
import itemsReducer from './itemsReducer';
import errorsReducer from './errorsReducer';
import messagesReducer from './messagesReducer';
import cartReducer from './cartReducer';


export default combineReducers({
	items: itemsReducer,
	cart: cartReducer,
	errors: errorsReducer,
	messages: messagesReducer,
});