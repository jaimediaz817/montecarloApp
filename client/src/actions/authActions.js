import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {

    // petición
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch( err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );

        //.catch(err => this.setState({ errors: err.response.data }))

    /*return {
        type: TEST_DISPATCH,
        payload: userData
    }*/
};

//-------------------------------------------------------------------
// Login User - Get User Token
export const loginUser = (userData) => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            // Save to localStorage
            const { token } = res.data;
            // set Token to LS
            localStorage.setItem('jwtToken', token);
            // set Token To Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current User
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })            
        );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};


//-------------------------------------------------------------------
// Log User - Log out
export const logoutUser = () => dispatch => {
    // Remove token from localstorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // set current user to {} wich set isAuthenticated to false
    dispatch(setCurrentUser({}));
};