import * as ActioTypes from './ActionTypes';

export const Userinfo = (state = {
    isLoading: true,
    errMess: null,
    user_info: []
}, action) => {
    switch(action.type) {
        case ActioTypes.ADD_USER:
            return {...state, isLoading: false, errMess: null, user_info: action.payload};
        
        case ActioTypes.USER_LOADING:
            return {...state, isLoading: true, errMess: null, user_info: []};

        case ActioTypes.USER_FAILED:
            return {...state, isLoading: false, errMess: action.payload, user_info: []};
        
        default:
            return state;
    }
}