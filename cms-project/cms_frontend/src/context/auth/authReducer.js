import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    PERMISIONS_LOADED,
    GETALL_USERS,
    GLOBAL_PERMISSIONS_LOADED
} from "../types";
  
const authReducer = (state, action) => {
    switch (action.type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload,
        };
  
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        localStorage.setItem("token", action.payload.message);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false,
        };
      case PERMISIONS_LOADED:
        return {
          ...state,
          loading: false,
          permissions: action.payload
        }
      case GLOBAL_PERMISSIONS_LOADED:
        return {
          ...state,
          loading: false,
          globalPermissions: action.payload
        }
      case GETALL_USERS:
        return {
          ...state,
          loading: false,
          users: action.payload
        }
      case REGISTER_FAIL:
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          //user: undefined,
          error: action.payload,
          loading: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
};

export default authReducer;
