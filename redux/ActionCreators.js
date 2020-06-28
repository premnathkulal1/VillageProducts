import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import AsyncStorage from '@react-native-community/async-storage';

// Products
export const fetchProducts = () => (dispatch) => {
  dispatch(productsLoading(true));
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
      .then(products => dispatch(addProducts(products)))
      .catch(error => dispatch(productsFailed(error.message)));
}

export const productsLoading = () => ({
    type: ActionTypes.PRODUCT_LOADING
});

export const productsFailed = (errmess) => ({
    type: ActionTypes.PRODUCT_FAILED,
    payload: errmess
});

export const addProducts = (products) => ({
    type: ActionTypes.ADD_PRODUCT,
    payload: products
});

// Register
export const registerUser = (username, password, fullname, adress, admin) => dispatch => {
    dispatch(requesRegister())
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
            dispatch(receiveRegister(response));
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
    .then(response => { console.log('Register', response); alert("Successfully Registerd") })
    .catch(error => dispatch(registerError(error.message)))
}


export const requesRegister = () => {
    return {
        type: ActionTypes.REGISTER_REQUEST,
    }
}
  
export const receiveRegister = (response) => {
    return {
        type: ActionTypes.REGISTER_SUCCESS,
    }
}
  
export const registerError = (message) => {
    return {
        type: ActionTypes.REGISTER_FAILURE,
        message
    }
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
            global.token = response.token;
            global.creds = JSON.stringify(creds)
            // Dispatch the success action
            dispatch(receiveLogin(response));
            dispatch(fetchUserInfo());
            dispatch(fetchFavorits());
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
            AsyncStorage.setItem('creds', JSON.stringify(creds));
            global.token = response.token;
            global.creds = JSON.stringify(creds)
            // Dispatch the success action
            dispatch(fetchUserInfo());
            dispatch(fetchFavorits());
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
        token: response.token,
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
    global.token = '';
    global.creds = '';
    dispatch(userFailed("Error 401: Unauthorized"));
    dispatch(favoritsFailed("Error 401: Unauthorized"))
    dispatch(receiveLogout())
}

//Fetch user Informations
export const fetchUserInfo = () => (dispatch) => {

    const bearer = 'Bearer ' + global.token;
    dispatch(userLoading(true));
    return fetch(baseUrl + 'users', {
            headers: {
                'Authorization': bearer
            },
        })
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
        .then(uerInfo => dispatch(addUser(uerInfo)))
        .catch(error => dispatch(userFailed(error.message)));
  }
  
  export const userLoading = () => ({
      type: ActionTypes.USER_LOADING
  });
  
  export const userFailed = (errmess) => ({
      type: ActionTypes.USER_FAILED,
      payload: errmess
  });
  
  export const addUser = (uerInfo) => ({
      type: ActionTypes.ADD_USER,
      payload: uerInfo
  });


//Fetch user Favorits
export const fetchFavorits = () => (dispatch) => {

    const bearer = 'Bearer ' + global.token;
    dispatch(favoritsLoading(true));
    return fetch(baseUrl + 'favorits', {
            headers: {
                'Authorization': bearer
            },
        })
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
        .then(favorits => dispatch(addfavorits(favorits)))
        .catch(error => dispatch(favoritsFailed(error.message)));     
  }
  
  export const favoritsLoading = () => ({
      type: ActionTypes.FAVORITS_LOADING
  });
  
  export const favoritsFailed = (errmess) => ({
      type: ActionTypes.FAVORITS_FAILED,
      payload: errmess
  });
  
  export const addfavorits = (favorits) => ({
      type: ActionTypes.ADD_FAVORITS,
      payload: favorits
  });

  //Delete user favorits
  export const deleteFavorite = (favId) => (dispatch) => {

    const bearer = 'Bearer ' + global.token;
    //dispatch(favoritsLoading(true));
    return fetch(baseUrl + 'favorits/'+favId, {
        method: "DELETE",
        //body: JSON.stringify({favId}),
        headers: {
          'Authorization': bearer,
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
    .then(favorits => {dispatch(fetchFavorits())})
    .catch(error => {alert("Error while deleting your favotite"), dispatch(favoritsFailed(error))});
};