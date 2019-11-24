import { combineReducers } from 'redux'
import itemsReducer from './itemsReducer';
import errorsReducer from './errorsReducer';
import messagesReducer from './messagesReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import categoriesReducer from './categoriesReducer';
import salesReducer from './salesReducer';


export default combineReducers({
	items: itemsReducer,
	cart: cartReducer,
	order: orderReducer,
	errors: errorsReducer,
	messages: messagesReducer,
	auth: authReducer,
	users: usersReducer,
	categories: categoriesReducer,
	sales: salesReducer,
});