import {
  PARTNER_BY_USER,
  PARTNER_MODAL_CREATE,
  LOADING_PARTNER,
  PARTNER_ERROR,
  CREATE_PARTNER,
  REMOVE_PARTNER_ERROR,
  REGISTER_PARTNER,
  PARTNER_STATUS,
  UPDATE_PARTNER,
  PARTNER_MODAL_UPDATE
} from "../actionTypes"
import  axios from 'axios'
import api from "../../environments/environment";
import {createUser} from "./userAction";
import {isOperator, OperatorId, OperatorName} from "../../environments/constants";

export const getPartners = () => async dispatch => {
  try {
    dispatch(isLoading());
    const res = await axios.get(`${api.partner}/api/all/partners/`);
    let operatorPartner = [];
   if(isOperator) {
     const res1 = await axios.get(`${api.vehicle}/api/operator/partners?operator=${OperatorId}`);
     if(res1.data.partnerId.length > 0 && res.data.length > 0) {
       res1.data.partnerId.forEach((id=> {
         res.data.map(partner=> {
           if(partner.id == id) {
             operatorPartner.push(partner)
           }
         })
       }));
     }
   }
    dispatch({
      type:  PARTNER_BY_USER,
      payload: isOperator ? operatorPartner: res.data
    });
  } catch (err) {
    dispatch({
      type: PARTNER_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });

  }
};

export const registerPartner = (username, password, name, email, phoneNo, officeAddress, status, numberOfVehicle) => async dispatch => {
  const body = {username, password};
  try {
    const res = await axios.post(`${api.register}/admin/users/`, body);
    dispatch({
      type:  REGISTER_PARTNER,
      payload: res.data
    });
    if(res) {
      dispatch(createPartner(res.data.id, name, email, '+234' + phoneNo.substr(1), officeAddress, status, numberOfVehicle, email))
      dispatch(createUser(name, name, email, email, 'not available', '+234' + phoneNo.substr(1), res.data.id))

    }
    dispatch(getPartners())
  } catch (err) {
    dispatch({
      type: PARTNER_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });

  }
};


export const createPartner = (pin, name, email, phoneNo, officeAddress, status, numberOfVehicle, usernameMain) => async dispatch => {
  const body = {pin, name, email, phoneNo, officeAddress, status, numberOfVehicle, usernameMain};
  try {
    const res = await axios.post(`${api.partner}/api/me/partners/`, body);
    dispatch({
      type: CREATE_PARTNER,
      payload: res.data
    });
    dispatch(togglePartnerModalCreate());
  } catch (err) {
    dispatch({
      type:  PARTNER_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    dispatch(togglePartnerModalCreate());
    setTimeout(() => dispatch({
      type: REMOVE_PARTNER_ERROR
    }), 5000)

  }
};

export const updatePartner = (id, name, email, phoneNo, officeAddress, status, numberOfVehicle) => async dispatch => {
  const body = {name, email, phoneNo, officeAddress, status, numberOfVehicle};
  try {
    const res = await axios.put(`${api.partner}/api/partners/${id}/`, body);
    dispatch({
      type: UPDATE_PARTNER,
      payload: res.data
    });
    dispatch(getPartners());
    dispatch(togglePartnerModalUpdate());
  } catch (err) {
    dispatch({
      type:  PARTNER_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    setTimeout(() => dispatch({
      type: REMOVE_PARTNER_ERROR
    }), 5000)

  }
};


export const changePartnerStatus = (id, status) => async dispatch => {
  try {
    const res = await axios.put(`${api.partner}/api/status/${id}/`, {status});
    dispatch({
      payload: res.data,
      type: PARTNER_STATUS,
    });
    dispatch(getPartners());
  } catch (err) {
    dispatch({
      type: PARTNER_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    setTimeout(() => dispatch({
      type: REMOVE_PARTNER_ERROR
    }), 5000)
  }
};


export function togglePartnerModalCreate() {
  return {
    type: PARTNER_MODAL_CREATE
  };
}
export function togglePartnerModalUpdate(id) {
  return {
    type: PARTNER_MODAL_UPDATE,
    payload: id
  };
}

export function isLoading() {
  return {
    type: LOADING_PARTNER,
  };
}
