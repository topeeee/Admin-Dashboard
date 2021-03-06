import {
  USER_BY_USER,
  USER_MODAL_CREATE,
  USER_MODAL_DELETE,
  DELETE_USER,
  CLOSE_MODAL_DELETE_USER,
  LOADING_USER,
  USER_ERROR,
  SEARCH_USER,
  REMOVE_USER_ERROR,
  USER_STATUS,
  USER_MONTH_QUERY
} from "../actionTypes"
import  axios from 'axios'
import api from "../../environments/environment";
import {isOperator, OperatorId} from "../../environments/constants";




export const getUsers = () => async dispatch => {
  try {
    dispatch(isLoading());
    const operatorUser = [];
    const res = await axios.get(`${api.user}/api/userdetails/`);
    if(res.data && isOperator) {
      const res1 = await axios.get(`${api.trip}/api/operator/passenger?operatorId=${OperatorId}`);
      if(res1.data.length > 0) {
        res1.data.forEach((pin=> {
          res.data.map(user=> {
            if(user.pin === pin) {
              operatorUser.push(user)
            }
          })
        }));
      }
    }
    dispatch({
      type: USER_BY_USER,
      payload: isOperator? operatorUser: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });

  }
};

export const createUser = (firstName, lastName, usernameMain, email, dateOfBirth, phoneNumber, pin) => async dispatch => {
  const body = {firstName, lastName, usernameMain, email, dateOfBirth, phoneNumber, pin};
  try {
    await axios.post(`${api.user}/api/me/userdetails/`, body);
  } catch (err) {}
};

export const changeUserStatus = (id, status) => async dispatch => {
  try {
    const res = await axios.put(`${api.user}/api/status/${id}/`, {status});
    dispatch({
      payload: id,
      type: USER_STATUS,
    });
    dispatch(getUsers());
  } catch (err) {
    // dispatch({
    //   type: OPERATOR_ERROR,
    //   payload: "Opps! Something Went Wrong Try Again"
    // });
    // setTimeout(() => dispatch({
    //   type: REMOVE_OPERATOR_ERROR
    // }), 5000)
  }
};
export const deleteUser = (id) => async dispatch => {

  try {
    const res = await axios.delete(`${api.user}/admin/userdetails/${id}/`);
    dispatch({
      type: DELETE_USER,
      payload: res.data
    });
    dispatch(getUsers());
    dispatch(closeUserModalDelete());
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    dispatch(closeUserModalDelete());
    setTimeout(() => dispatch({
      type: REMOVE_USER_ERROR
    }), 5000)
  }
};

export const searchUser = (id) => async dispatch => {
  try {
    dispatch(isLoading());
    const res = await axios.get(`${api.user}/api/userdetails/${id}/`);
    dispatch({
      type: SEARCH_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: "User not Available"
    });
  }
};


export function toggleUserModalCreate() {
  return {
    type: USER_MODAL_CREATE
  };
}

export function toggleUserModalDelete(id) {
  return {
    type: USER_MODAL_DELETE,
    payload: id
  };
}

export function closeUserModalDelete() {
  return {
    type: CLOSE_MODAL_DELETE_USER,
  };
}

export function isLoading() {
  return {
    type: LOADING_USER,
  };
}

export const getUsersMonthQuery = (year) => async dispatch => {
  try {
    const res = await axios.get(`${api.user}/api/monthquery/?year=${year}`)
    dispatch({
      type: USER_MONTH_QUERY,
      payload: res.data
    });
  } catch (err) {}
};
