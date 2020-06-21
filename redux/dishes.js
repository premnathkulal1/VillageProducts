import * as ActioTypes from './ActionTypes';

export const dishes = (state = {
    isLoading: true,
    errMess: null,
    dishes: []
}, action) => {
    switch(action.type) {
        case ActioTypes.ADD_PRODUCT:
            return {...state, isLoading: false, errMess: null, dishes: action.payload};
        
        case ActioTypes.PRODUCT_LOADING:
            return {...state, isLoading: true, errMess: null, dishes: []};

        case ActioTypes.PRODUCT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, dishes: []};
        
        default:
            return state;
    }
}