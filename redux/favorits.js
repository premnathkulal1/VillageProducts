import * as ActioTypes from './ActionTypes';

export const Favorits = (state = {
    isLoading: true,
    errMess: null,
    favorits: []
}, action) => {
    switch(action.type) {
        case ActioTypes.ADD_FAVORITS:
            return {...state, isLoading: false, errMess: null, favorits: action.payload};
        
        case ActioTypes.FAVORITS_LOADING:
            return {...state, isLoading: true, errMess: null, favorits: []};

        case ActioTypes.FAVORITS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, favorits: []};
        
        default:
            return state;
    }
}