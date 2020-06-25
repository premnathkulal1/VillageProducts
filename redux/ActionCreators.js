import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import AsyncStorage from '@react-native-community/async-storage';

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
    .then(response => { console.log('Register', response); alert('Registration successful!\n'); })
    .catch(error =>  { console.log('Register', error.message); alert('Your Registration unsuccessful\n'); });
}

//Login 
export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    //console.log("Hello");
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
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
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            //alert(response.token)
            AsyncStorage.setItem('token', response.token);
            AsyncStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            //dispatch(fetchFavorites());
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const loginWithFacebookUser = (token) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    //console.log("Hello");
    console.log("token 2 : "+token);

    dispatch(requestLogin({"facebook": "true"}))

    return fetch(baseUrl + 'users/facebook/token/', {
        method: 'GET',
        headers: { 
            'Content-Type':'application/json',
            'access_token': token
        },
        //body: JSON.stringify(creds)
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
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            //alert(response.token)
            AsyncStorage.setItem('token', response.token);
            AsyncStorage.setItem('creds', JSON.stringify({"facebook": "true"}));
            // Dispatch the success action
            //dispatch(fetchFavorites());
            console.log("token 3 : "+token);
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logout
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    AsyncStorage.setItem('token', '');
    AsyncStorage.setItem('creds', '');
    //dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}