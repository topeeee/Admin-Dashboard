import {
  SERVICE,
  CREATE_SERVICE,
  SERVICE_MODAL_CREATE,
  SERVICE_MODAL_UPDATE,
  UPDATE_SERVICE,
  SERVICE_ERROR,
  REMOVE_SERVICE_ERROR,
  LOADING_SERVICE,
  SEARCH_SERVICE,
  LAMATA_SERVICE_MODAL_CREATE
} from "../actionTypes"
import  axios from 'axios'
import api from "../../environments/environment";
import {isAdmin, isLamata, isOperator, isPartner, OperatorId} from "../../environments/constants";




export const getService = () => async dispatch => {
  let newOperatorService = []
  try {
    dispatch(isLoading());
    const res = await axios.get(`${api.service}/api/services/`);
    if(isOperator) {
      const res1 =  await axios.get(`${api.operatorService}/api/mode/?operator_name=${OperatorId}`)
      res1.data.forEach(operatorService => {
        res.data.forEach(service=> {
          if(service.id == operatorService.servicecode) {
            newOperatorService.push(service)
          }
        })
      })
    }
    dispatch({
      type: SERVICE,
      payload: (isAdmin || isLamata || isPartner) ? res.data: newOperatorService
    });
  } catch (err) {
    dispatch({
      type: SERVICE_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });

  }
};

export const createService = (servicecode, service, statecode) => async dispatch => {
  const body = {servicecode, service, statecode};
  try {
    const res = await axios.post(`${api.service}/api/me/services/`, body);
    dispatch({
      type: CREATE_SERVICE,
      payload: res.data
    });
    dispatch(getService());
    dispatch(toggleServiceModalCreate());
  } catch (err) {
    dispatch({
      type: SERVICE_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    dispatch(toggleServiceModalCreate());
    setTimeout(() => dispatch({
      type: REMOVE_SERVICE_ERROR
    }), 5000)

  }
};

export const updateService = (id, servicecode, service, statecode) => async dispatch => {
  const body = {servicecode, service, statecode};
  try {
    const res = await axios.put(`${api.service}/api/services/${id}/`, body);
    dispatch({
      type: UPDATE_SERVICE,
      payload: res.data
    });
    dispatch(getService());
    dispatch(toggleServiceModalUpdate());
  } catch (err) {
    dispatch({
      type: SERVICE_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    dispatch(toggleServiceModalUpdate());
    setTimeout(() => dispatch({
      type: REMOVE_SERVICE_ERROR
    }), 5000)

  }
};


export const searchService = (id) => async dispatch => {

  try {
    dispatch(isLoading());
    const res = await axios.get(`${api.service}/api/services/${id}/`);
    dispatch({
      type: SEARCH_SERVICE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SERVICE_ERROR,
      payload: "State Not Available!!"
    });
  }
};


export function toggleServiceModalCreate() {
  return {
    type: SERVICE_MODAL_CREATE
  };
}

export function toggleServiceModalUpdate(id) {
  return {
    type: SERVICE_MODAL_UPDATE,
    payload: id
  };
}


export function toggleLamataServiceModalCreate() {
  return {
    type: LAMATA_SERVICE_MODAL_CREATE,
  };
}


export function isLoading() {
  return {
    type: LOADING_SERVICE,
  };
}


