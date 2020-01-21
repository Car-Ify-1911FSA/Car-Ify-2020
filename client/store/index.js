import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import user from './user';
import allProducts from './allProducts';
import top3Products from './top3Products';
import cart from './cart';
import cartProduct from './cartProduct';
import paymentAccounts from './paymentAccounts';
import orderHistory from './orderHistory';

const reducer = combineReducers({
  user,
  allProducts,
  cart,
  cartProduct,
  paymentAccounts,
  top3Products,
  orderHistory
});

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware
    // createLogger({collapsed: true})
  )
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './allProducts';
export * from './cart';
export * from './paymentAccounts';
export * from './cartProduct';
export * from './top3Products';
export * from './userProfile';
export * from './orderHistory';
