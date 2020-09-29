import {
  LOGIN_SUCCESS,
  AUTH_ERROR,
  REMOVE_AUTH_ERROR,
  USER_AUTHORIZED,
  PARTNER,
  ADMIN,
  OPERATOR,
  LOGOUT,
  LAMATA
} from "../actionTypes"
import  axios from 'axios'
import api from "../../environments/environment";
import React from "react";
import {OperatorName} from "../../environments/constants";


export const LogIn = (username, password) => async dispatch => {
  sessionStorage.clear();
  const body = {username, password};
  try {
    const res = await axios.post(`${api.login}/api/login/`, body);
    const token  = res.data.Authorized;
    sessionStorage.setItem("token", token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: token
    });
    if(res.data) {
      dispatch(getAdmin(username));
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response
    });

      setTimeout(() => dispatch({
        type: REMOVE_AUTH_ERROR
      }), 5000)
  }
};

export const LamataLogIn = (username, password) => async dispatch => {
  sessionStorage.clear();
  const body = {username, password};
  try {
    const res = await axios.post(`${api.login}/api/login/`, body);
    const token  = res.data.Authorized;
    sessionStorage.setItem("token", token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: token
    });
    if(res.data) {
      dispatch(getLamata(username));
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response
    });

    setTimeout(() => dispatch({
      type: REMOVE_AUTH_ERROR
    }), 5000)
  }
};


export const OperatorLogIn = (username, password) => async dispatch => {
  sessionStorage.clear();
  const body = {username, password};
  try {
    const res = await axios.post(`${api.login}/api/login/`, body);
    const token  = res.data.Authorized;
    sessionStorage.setItem("token", token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: token
    });
    if(res.data) {
      dispatch(getOperator(username));
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response
    });

    setTimeout(() => dispatch({
      type: REMOVE_AUTH_ERROR
    }), 5000)
  }
};

export const PartnerLogIn = (username, password) => async dispatch => {
  sessionStorage.clear();
  const body = {username, password};
  try {
    const res = await axios.post(`${api.login}/api/login/`, body);
    const token  = res.data.Authorized;
    sessionStorage.setItem("token", token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: token
    });
    if(res.data) {
      dispatch(getPartner(username));
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response
    });

    setTimeout(() => dispatch({
      type: REMOVE_AUTH_ERROR
    }), 5000)
  }
};



export function LogOut() {
  return {
    type: LOGOUT,

  };
}

export function Authorized() {
  return {
    type: USER_AUTHORIZED,

  };
}

export const getAdmin = (username) => async dispatch => {
  try {
    const res = await axios.get(`${api.admin}/api/admins/?search=${username}`);
    if(res.data.length > 0) {
      dispatch({
        type:  ADMIN,
        payload: res.data
      });

    } else {
      dispatch({
        type: AUTH_ERROR,
        payload: "Unauthorized"
      });
      setTimeout(() => dispatch({
        type: REMOVE_AUTH_ERROR
      }), 5000)
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Unauthorized"
    });

  }
};


  export const getLamata = (username) => async dispatch => {
    try {
      const res = await axios.get(`${api.lamata}/api/lamatas/?search=${username}`);
      if(res.data.length > 0) {
        dispatch({
          type:  LAMATA,
          payload: res.data
        });
        sessionStorage.setItem('LamataName', res.data[0].name);
      } else {
        dispatch({
          type: AUTH_ERROR,
          payload: "Unauthorized"
        });
        setTimeout(() => dispatch({
          type: REMOVE_AUTH_ERROR
        }), 5000)
      }
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Unauthorized"
      });

    }
  };

export const getOperator = (username) => async dispatch => {
  try {
    const res = await axios.get(`${api.operator}/api/operators/`);
    const res1 = await axios.get(`${api.operatorZone}/api/operatorzones/`);
    res.data.map(operator => {
      if(operator.email === username) {
        dispatch({
          type:  OPERATOR,
          payload: res.data
        });
        sessionStorage.setItem('OperatorName', operator.name);
        sessionStorage.setItem('OperatorId', operator.id);
        if(res1.data) {
          res1.data.map(operatorZone => {
            if(operatorZone.operatorName == operator.id) {
              sessionStorage.setItem('OperatorZone', 'yes');
            }
          })
        }
      } else {
        dispatch({
          type: AUTH_ERROR,
          payload: "Unauthorized"
        });
        setTimeout(() => dispatch({
          type: REMOVE_AUTH_ERROR
        }), 5000)
      }
    })

  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Unauthorized"
    });

  }
};

export const getPartner = (username) => async dispatch => {
  try {
    const res = await axios.get(`${api.partner}/api/email/?email=${username}`);
    if(res.data.length > 0) {
      dispatch({
        type:  PARTNER,
        payload: res.data
      });
      sessionStorage.setItem('PartnerName', res.data[0].name);
      sessionStorage.setItem('PartnerId', res.data[0].id);

    } else {
      dispatch({
        type: AUTH_ERROR,
        payload: "Unauthorized"
      });
      setTimeout(() => dispatch({
        type: REMOVE_AUTH_ERROR
      }), 5000)
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Unauthorized"
    });

  }
};
