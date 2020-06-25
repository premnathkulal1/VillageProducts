import * as ActionTypes from './ActionTypes';
import * as React from 'react';

export const Register = (state = {
        isLoading: false,
        isRegsterd: false,
        errMess: null
    }, action) => {

    switch (action.type) {
        case ActionTypes.REGISTER_REQUEST:
            return {...state,
                isLoading: true,
                isRegsterd: false
            };
        case ActionTypes.REGISTER_SUCCESS:
            return {...state,
                isLoading: false,
                isRegsterd: true,
                errMess: null
            };
        case ActionTypes.REGISTER_FAILURE:
            return {...state,
                isLoading: false,
                isRegsterd: false,
                errMess: action.message
            };
        default:
            return state
    }
}