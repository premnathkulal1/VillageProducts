import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
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
            dishes
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);
    return {persistor, store};
}