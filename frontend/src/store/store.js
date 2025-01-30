import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from './features/product'
import cartReducer from './features/cart';
import categoryReducer from './features/category';
import commonReducer from './features/common';
import userReducer from './features/user';
import favouritesReducer from './favourites/favourites'

const rootReducer = combineReducers({
    productState: productReducer,
    cartState: cartReducer,
    categoryState: categoryReducer,
    commonState: commonReducer,
    favouritesState: favouritesReducer,
    userState: userReducer,
})

const store = configureStore({
    reducer: rootReducer
})

export default store;