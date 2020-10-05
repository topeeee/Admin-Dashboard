import {
  CLOSE_MODAL_DELETE_OPERATOR,
  CREATE_OPERATOR,
  DELETE_OPERATOR,
  LOADING_OPERATOR,
  OPERATOR_BY_USER,
  OPERATOR_ERROR,
  OPERATOR_MODAL_CREATE,
  OPERATOR_MODAL_APPROVE,
  OPERATOR_MODAL_UPDATE,
  OPERATOR_STATUS,
  REGISTER_OPERATOR,
  REMOVE_OPERATOR_ERROR,
  SEARCH_OPERATOR,
  UPDATE_OPERATOR,
  OPERATOR_MODAL_SUSPEND,
  OPERATOR_MODAL_REACTIVATE,
  OPERATOR_STATION,
  OPERATOR_MODE,
  OPERATOR_SERVICE, APPROVE_OPERATOR
} from "../actionTypes"
import axios from 'axios'
import api from "../../environments/environment";
import {createUser} from "./userAction";


export const getOperators = () => async dispatch => {
  try {
    dispatch(isLoading());
    const res = await axios.get(`${api.operator}/api/operators/`);
    dispatch({
      type:  OPERATOR_BY_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: OPERATOR_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });

  }
};

export const registerOperator = (id, username, password, name, phoneNo) => async dispatch => {
  const body = {username, password};

  try {
    const res = await axios.post(`${api.register}/admin/users/`, body);
      dispatch(setOperatorPin(id, res.data.id))
      dispatch(createUser(name, name, username, username, 'not available', '+234' + phoneNo.substr(1), res.data.id))
      dispatch(changeOperatorStatus(id, '1'))
  } catch (err) {
    dispatch({
      type: OPERATOR_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });

  }
};

export const DirectRegisterOperator = (id, username, password, name, phoneNo) => async dispatch => {
  const body = {username, password};

  try {
    const res = await axios.post(`${api.register}/admin/users/`, body);
    dispatch(setOperatorPin(id, res.data.id))
    dispatch(createUser(name, name, username, username, 'not available', '+234' + phoneNo.substr(1), res.data.id))
  } catch (err) {
    dispatch({
      type: OPERATOR_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });

  }
};



export const createOperator = (pin, name,usernameMain, email, phoneNo, officeAddress, status, numberOfVehicle, contactName, contactPhoneNo, contactEmail) => async dispatch => {
  const body = {pin, name, usernameMain, email, phoneNo:'+234' + phoneNo.substr(1), officeAddress, status, numberOfVehicle, contactName, contactPhoneNo, contactEmail};
  try {
    const res = await axios.post(`${api.operator}/api/me/operators/`, body);
    dispatch(DirectRegisterOperator(res.data.id, email, 'password', name, phoneNo))
    dispatch({
      type: CREATE_OPERATOR,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type:  OPERATOR_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    // dispatch(toggleOperatorModalCreate());
    setTimeout(() => dispatch({
      type: REMOVE_OPERATOR_ERROR
    }), 5000)

  }
};

export const updateOperator = (id, name, email, phoneNo, officeAddress, numberOfVehicle, contactName, contactPhoneNo, contactEmail) => async dispatch => {
  const body = {name, email, phoneNo, officeAddress, numberOfVehicle, contactName, contactPhoneNo, contactEmail};
  try {
    const res = await axios.put(`${api.operator}/api/operators/${id}/`, body);
    dispatch({
      type: UPDATE_OPERATOR,
      payload: res.data
    });
    dispatch(getOperators());
    dispatch(toggleOperatorModalUpdate());
  } catch (err) {
    dispatch({
      type:  OPERATOR_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    setTimeout(() => dispatch({
      type: REMOVE_OPERATOR_ERROR
    }), 5000)

  }
};


export const changeOperatorStatus = (id, status) => async dispatch => {
  try {
    const res = await axios.put(`${api.operator}/api/status/${id}/`, {status});
    dispatch({
      payload: res.data,
      type: OPERATOR_STATUS,
    });
    dispatch(getOperators());
  } catch (err) {
    dispatch({
      type: OPERATOR_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    setTimeout(() => dispatch({
      type: REMOVE_OPERATOR_ERROR
    }), 5000)
  }
};
export const deleteOperator = (id) => async dispatch => {

  try {
    const res = await axios.delete(`${api.operator}/admin/operators/${id}/`);
    dispatch({
      type: DELETE_OPERATOR,
      payload: res.data
    });
    dispatch(getOperators());
    dispatch(closeOperatorModalDelete());
  } catch (err) {
    dispatch({
      type: OPERATOR_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    dispatch(closeOperatorModalDelete());
    setTimeout(() => dispatch({
      type: REMOVE_OPERATOR_ERROR
    }), 5000)
  }
};

export const searchOperator = (id) => async dispatch => {
  try {
    dispatch(isLoading());
    const res = await axios.get(`${api.operator}/api/operators/${id}/`);
    dispatch({
      type: SEARCH_OPERATOR,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: OPERATOR_ERROR,
      payload: "Driver Route not Available"
    });
  }
};


export function toggleOperatorModalCreate() {
  return {
    type: OPERATOR_MODAL_CREATE
  };
}
export function toggleOperatorModalUpdate(id) {
  return {
    type: OPERATOR_MODAL_UPDATE,
    payload: id
  };
}

export function toggleOperatorModalSuspend(id) {
  return {
    type: OPERATOR_MODAL_SUSPEND,
    payload: id
  };
}

export function toggleOperatorModalReactivate(id) {
  return {
    type: OPERATOR_MODAL_REACTIVATE,
    payload: id
  };
}

export function toggleOperatorModalApprove(id) {
  return {
    type: OPERATOR_MODAL_APPROVE,
    payload: id
  };
}

export function closeOperatorModalDelete() {
  return {
    type: CLOSE_MODAL_DELETE_OPERATOR,
  };
}

export function isLoading() {
  return {
    type: LOADING_OPERATOR,
  };
}


export const getOperatorStations = () => async dispatch => {
  try {
    const res = await axios.get(`${api.operatorStation}/api/operatorstations/`);
    dispatch({
      type:  OPERATOR_STATION,
      payload: res.data
    });
  } catch (err) {}
};

export const getOperatorServices = () => async dispatch => {
  try {
    const res = await axios.get(`${api.operatorService}/api/operatorservices/`);
    dispatch({
      type:  OPERATOR_SERVICE,
      payload: res.data
    });
  } catch (err) {}
};

export const getOperatorModes = () => async dispatch => {
  try {
    const res = await axios.get(`${api.operatorMode}/api/operatormodes/`);
    dispatch({
      type:  OPERATOR_MODE,
      payload: res.data
    });
  } catch (err) {}
};

export const approveOperator = (id) => async dispatch => {
  try {
    const res = await axios.get(`${api.operator}/api/operators/${id}/`);
    if(res.data) {
      dispatch(registerOperator(res.data.id, res.data.email, "password", res.data.name, res.data.phoneNo))
    }
    dispatch({
      type:  APPROVE_OPERATOR,
      payload: res.data
    });
  } catch (err) {}
};


export const setOperatorPin = (id, pin) => async dispatch => {
  try {
    await axios.put(`${api.operator}/api/pin/${id}/?pin=${pin}`);
  } catch (err) {}
};
