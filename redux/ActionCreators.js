import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// Products
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseUrl + 'products')
      .then(response => {
          if (response.ok) {
              return response;
          }
          else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
          }
      },
      error => {
          var errmess = new Error(error.message);
          throw errmess;
      })
      .then(response => response.json())
      .then(dishes => dispatch(addDishes(dishes)))
      .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.PRODUCT_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.PRODUCT_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_PRODUCT,
    payload: dishes
});

// Register
export const registerUser = (username, password, fullname, adress, admin) => dispatch => {
    alert(fullname)
    return fetch(baseUrl + 'users/signup', {
        method: "POST",
        body: JSON.stringify({username, password, fullname, adress, admin}),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })

    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => { console.log('Register', response); alert('Registration successful!\n'+JSON.stringify(response)); })
    .catch(error =>  { console.log('Register', error.message); alert('Your Registration unsuccessful\nError: '+error.message); });
}