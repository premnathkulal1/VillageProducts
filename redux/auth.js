import * as ActionTypes from './ActionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import * as React from 'react';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.

const getData = async () => {
    try {
        const token = await AsyncStorage.getItem('token')
        const creds = await AsyncStorage.getItem('creds')
        return [token, creds]
    } catch(e) {
      // error reading value
    }
}

let token, creds;

getData()
.then( (imgSize) =>
        {
            token = imgSize[0]
            creds = imgSize[1]
        }
)

export const Auth = (state = {
        isLoading: false,
        isAuthenticated: token ? true : false,
        token: token,
        user: creds ? JSON.parse(creds) : null,
        errMess: null
    }, action) => {

    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: false,
                user: action.creds
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: true,
                errMess: null,
                token: action.token
            };
        case ActionTypes.LOGIN_FAILURE:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: action.message
            };
        case ActionTypes.LOGOUT_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: true
            };
        case ActionTypes.LOGOUT_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                token: '',
                user: null
            };
        default:
            return state
    }
}