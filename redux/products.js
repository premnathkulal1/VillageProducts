import * as ActioTypes from './ActionTypes';

export const Products = (state = {
    isLoading: true,
    errMess: null,
    products: []
}, action) => {
    switch(action.type) {
        case ActioTypes.ADD_PRODUCT:
            return {...state, isLoading: false, errMess: null, products: action.payload};
        
        case ActioTypes.PRODUCT_LOADING:
            return {...state, isLoading: true, errMess: null, products: []};

        case ActioTypes.PRODUCT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, products: []};
        
        default:
            return state;
    }
}