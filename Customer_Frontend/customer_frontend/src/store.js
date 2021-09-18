import { combineReducers } from 'redux';
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import ProductReducer from './Reducers/ProductReducer';
import CartReducer from './Reducers/CartReducer';
 const composeWithDevTools=window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ ||compose;
const store=createStore(
combineReducers({
  products:ProductReducer,
  cart:CartReducer
}),
composeWithDevTools(applyMiddleware(thunk))
);
export default store;
