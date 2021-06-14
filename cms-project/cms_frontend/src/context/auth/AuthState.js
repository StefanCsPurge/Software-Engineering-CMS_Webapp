import AuthContext from "./authContext"
import authReducer from "./authReducer"
import axios from "axios"
import { useReducer } from "react";

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_ERRORS,
    PERMISIONS_LOADED,
    GETALL_USERS,
    GLOBAL_PERMISSIONS_LOADED
} from "../types"

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: false,
        users: [],
        globalPermissions: [],
        permissions: [{
            conferenceID: 1,
            userID: 1,
            permission: 'pc'
          },
          {
            conferenceID: 1,
            userID: 1,
            permission: 'chair'
          },
          {
            conferenceID: 1,
            userID: 1,
            permission: 'listener'
          },
          {
            conferenceID: 1,
            userID: 1,
            permission: 'author'
          },
        ],
        loading: false,
        error: null,
        user: {
          id: 1,
          name: "",
          isAdmin: false,
        },
    };

    
    const [state, dispatch] = useReducer(authReducer, initialState);

    // GET USER PERMISIONS
    const getUserPermissions = async (id) => {
      const config = {
        headers: {
          "Authorization" : "Bearer " + localStorage.getItem("token"),
        },
      }

      try {
          const res = await axios.post("http://localhost:8080/api/getUserPermissions", id, config);

          dispatch({type: PERMISIONS_LOADED, payload: res.data});
      } catch (err) {
          dispatch({type: AUTH_ERROR});
      }
    }

    // GET GLOBAL PERMISSIONS
    const getAllPermissions = async () => {
      const config = {
        headers: {
          "Authorization" : "Bearer " + localStorage.getItem("token"),
        },
      }

      try {
          const res = await axios.get("http://localhost:8080/api/getAllPermissions", config);

          dispatch({type: GLOBAL_PERMISSIONS_LOADED, payload: res.data});
      } catch (err) {
          dispatch({type: AUTH_ERROR});
      }
    }

    //Load User
    const loadUser = async () => {
        const config = {
          headers: {
            "Authorization" : "Bearer " + localStorage.getItem("token"),
          },
        }

        try {
            const res = await axios.get("http://localhost:8080/api/getLoggedUser", config);
            dispatch({type: USER_LOADED, payload: res.data});
        } catch (err) {
            dispatch({type: AUTH_ERROR})
        }
    }

    // Register User
    const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {

      // add route here
      const res = await axios.post("http://localhost:8080/api/register", formData, config);
      // res.data should contain the token, if no errors

      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      //await loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
    };

    // Get All Users
    const getAllUsers = async () => {
      const config = {
        headers: {
          "Authorization" : "Bearer " + localStorage.getItem("token"),
        },
      }

      try {
        const res = await axios.get("http://localhost:8080/api/getUsers", config);
        dispatch({type: GETALL_USERS, payload: res.data})
      } catch (err) {
        dispatch({type: AUTH_ERROR})
      }
    }

    // Login User
    const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("http://localhost:8080/api/authenticate", formData, config);

      //localStorage.token = res.data.message;
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      await loadUser();
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

    return (
        <AuthContext.Provider
        value = {{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            users: state.users,
            error: state.error,
            permissions: state.permissions,
            globalPermissions: state.globalPermissions,
            register,
            login,
            logout,
            loadUser,
            clearErrors,
            getUserPermissions,
            getAllUsers,
            getAllPermissions
        }}>
          {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;
