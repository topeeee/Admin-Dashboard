import {
  MODE_BY_USER,
  MODE_MODAL_CREATE,
  MODE_MODAL_UPDATE,
  UPDATE_MODE,
  CLOSE_MODAL_DELETE_MODE,
  LOADING_MODE,
  MODE_ERROR,
  SEARCH_MODE,
  CREATE_MODE,
  REMOVE_MODE_ERROR,
  LAMATA_MODE_MODAL_CREATE
} from "../actionTypes"
import  axios from 'axios'
import api from "../../environments/environment";
import {isAdmin, isLamata, isOperator, isPartner, OperatorId} from "../../environments/constants";



export const getModes = () => async dispatch => {
  try {
    let newOperatorMode = []
    dispatch(isLoading());
    const res = await axios.get(`${api.mode}/api/modes/`);
      if(isOperator) {
        const res1 =  await axios.get(`${api.operatorMode}/api/mode/?operator_name=${OperatorId}`)
        res1.data.forEach(operatorMode => {
          res.data.forEach(mode=> {
            if(mode.id == operatorMode.modecode) {
              newOperatorMode.push(mode)
            }
          })
        })
      }
    dispatch({
      type: MODE_BY_USER,
      payload: (isAdmin || isLamata || isPartner) ? res.data: newOperatorMode
    });
  } catch (err) {
    dispatch({
      type: MODE_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });

  }
};


export const createMode = (modecode, mode, statecode, service, servicecode) => async dispatch => {
  const body = {modecode, mode, statecode, service, servicecode};


  try {
    const res = await axios.post(`${api.mode}/api/me/modes/`, body);
    dispatch({
      type: CREATE_MODE,
      payload: res.data
    });
    dispatch(getModes());
    dispatch(toggleModeModalCreate());
  } catch (err) {
    dispatch({
      type: MODE_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    dispatch(toggleModeModalCreate());
    setTimeout(() => dispatch({
      type: REMOVE_MODE_ERROR
    }), 5000)

  }
};

export const updateMode = (id, modecode, mode, statecode, service, servicecode) => async dispatch => {
  const body = {modecode, mode, statecode, service, servicecode};


  try {
    const res = await axios.put(`${api.mode}/api/modes/${id}/`, body);
    dispatch({
      type: UPDATE_MODE,
      payload: res.data
    });
    dispatch(getModes());
    dispatch(toggleModeModalUpdate());
  } catch (err) {
    dispatch({
      type: MODE_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    dispatch(toggleModeModalUpdate());
    setTimeout(() => dispatch({
      type: REMOVE_MODE_ERROR
    }), 5000)

  }
};


export const searchMode = (id) => async dispatch => {
  try {
    dispatch(isLoading());
    const res = await axios.get(`${api.mode}/api/modes/${id}/`);
    dispatch({
      type: SEARCH_MODE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MODE_ERROR,
      payload: "Mode not Available"
    });
  }
};


export function toggleModeModalCreate() {
  return {
    type: MODE_MODAL_CREATE
  };
}

export function toggleLamataModeModalCreate() {
  return {
    type: LAMATA_MODE_MODAL_CREATE
  };
}

export function toggleModeModalUpdate(id) {
  return {
    type: MODE_MODAL_UPDATE,
    payload: id
  };
}

export function closeModeModalDelete() {
  return {
    type: CLOSE_MODAL_DELETE_MODE,
  };
}

export function isLoading() {
  return {
    type: LOADING_MODE,
  };
}
