import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Products } from './products';
import { Auth } from './auth';
import { Register } from './register';
import  { persistStore, persistCombineReducers } from 'redux-persist';
//import storage from 'redux-persist/es/storage'
import { AsyncStorage } from 'react-native'

export const ConfigureStore = () => {

    const config = {
        key: 'root',
        storage: AsyncStorage,
        debug: true
    }

    const store = createStore(
        persistCombineReducers( config, {
            products: Products,
            auth: Auth,
            register: Register
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);
    return {persistor, store};
}