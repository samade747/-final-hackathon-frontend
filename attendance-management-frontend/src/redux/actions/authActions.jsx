import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from './types';
  import authService from '../../api/auth';
  
  export const register = (username, email, password) => async (dispatch) => {
    try {
      const response = await authService.register(username, email, password);
  
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { user: response.data },
      });
  
      return Promise.resolve();
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
      });
  
      return Promise.reject();
    }
  };
  
  export const login = (email, password) => async (dispatch) => {
    try {
      const response = await authService.login(email, password);
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: response.data },
      });
  
      return Promise.resolve();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
      });
  
      return Promise.reject();
    }
  };
  
  export const logout = () => (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
  