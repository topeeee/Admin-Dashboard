import {
  BUS_ASSISTANT_BY_USER,
  BUS_ASSISTANT_MODAL_CREATE,
  LOADING_BUS_ASSISTANT,
  BUS_ASSISTANT_ERROR,
  SEARCH_BUS_ASSISTANT,
  CREATE_BUS_ASSISTANT,
  REMOVE_BUS_ASSISTANT_ERROR,
  BUS_ASSISTANT_STATUS,
  BUS_ASSISTANT_MODAL_UPDATE,
  UPDATE_BUS_ASSISTANT
} from "../actionTypes"
import  axios from 'axios'
import api from "../../environments/environment";
import {isAdmin, isLamata, isOperator, OperatorId} from "../../environments/constants";




export const getBusAssistants = () => async dispatch => {
  let BusApi;
  if(isAdmin || isLamata) {
    BusApi = `${api.operationAssistant}/api/operationassistants/`
  }else if(isOperator){
    BusApi = `${api.operationAssistant}/api/operationassistants/operator/?operatorid=${OperatorId}`;
  }
  try {
    dispatch(isLoading());
    const res = await axios.get(BusApi);
    dispatch({
      type: BUS_ASSISTANT_BY_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BUS_ASSISTANT_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });

  }
};
export const changeBusAssistants = (id, status) => async dispatch => {
  try {
    await axios.put(`${api.operationAssistant}/api/status/${id}/`, {status});
    dispatch({
      payload: id,
      type: BUS_ASSISTANT_STATUS,
    });
    dispatch(getBusAssistants());
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


export const createBusAssistants = (operatorid, firstName, lastName, pin, residentialAddress, email, status, phoneNo, bankName, accountName, accountNumber, assignedMode, zone, area, route, geoFencedArea, role) => async dispatch => {
  const body = { firstName, lastName, pin, operatorid, residentialAddress, email, status, phoneNo, bankName, accountName, accountNumber, assignedMode, zone, area, route, geoFencedArea, role
  };
  try {
    const res = await axios.post(`${api.operationAssistant}/api/me/operationassistants/`, body);
    dispatch({
      type: CREATE_BUS_ASSISTANT,
      payload: res.data
    });
    dispatch(getBusAssistants());
    dispatch(toggleBusAssistantsModalCreate());
  } catch (err) {
    dispatch({
      type: BUS_ASSISTANT_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    dispatch(toggleBusAssistantsModalCreate());
    setTimeout(() => dispatch({
      type: REMOVE_BUS_ASSISTANT_ERROR
    }), 5000)

  }
};

export const updateBusAssistants = (id, operatorid,  firstName, lastName, pin, residentialAddress, email, status, phoneNo, bankName, accountName, accountNumber, assignedMode, zone, area, route, geoFencedArea, role) => async dispatch => {
  const body = { firstName, lastName, pin, operatorid, residentialAddress, email, status, phoneNo, bankName, accountName, accountNumber, assignedMode, zone, area, route, geoFencedArea, role};
  try {
    const res = await axios.put(`${api.operationAssistant}/api/operationassistants/${id}/`, body);
    dispatch({
      type: UPDATE_BUS_ASSISTANT,
      payload: res.data
    });
    dispatch(getBusAssistants());
    dispatch(toggleBusAssistantsModalUpdate());
  } catch (err) {
    dispatch({
      type: BUS_ASSISTANT_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    dispatch(toggleBusAssistantsModalCreate());
    setTimeout(() => dispatch({
      type: REMOVE_BUS_ASSISTANT_ERROR
    }), 5000)

  }
};


export const searchBusAssistants = (id) => async dispatch => {
  try {
    dispatch(isLoading());
    const res = await axios.get(`${api.operationAssistant}/api/operationassistants/${id}/`);
    dispatch({
      type: SEARCH_BUS_ASSISTANT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BUS_ASSISTANT_ERROR,
      payload: "Driver not Available"
    });
  }
};



export function toggleBusAssistantsModalCreate() {
  return {
    type: BUS_ASSISTANT_MODAL_CREATE
  };
}

export function toggleBusAssistantsModalUpdate(id) {
  return {
    type: BUS_ASSISTANT_MODAL_UPDATE,
    payload: id
  };
}



export function isLoading() {
  return {
    type: LOADING_BUS_ASSISTANT,
  };
}
