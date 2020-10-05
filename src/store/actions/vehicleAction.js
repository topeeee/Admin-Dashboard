import {
  VEHICLE_BY_USER,
  VEHICLE_MODAL_CREATE,
  VEHICLE_MODAL_DELETE,
  DELETE_VEHICLE,
  CLOSE_MODAL_DELETE_VEHICLE,
  LOADING_VEHICLE,
  VEHICLE_ERROR,
  SEARCH_VEHICLE,
  CREATE_VEHICLE,
  REMOVE_VEHICLE_ERROR,
  VEHICLE_STATUS,
  UPDATE_VEHICLE,
  VEHICLE_MODAL_UPDATE,
  VEHICLE_BY_ALL,
  VEHICLE_BY_ME,
  VEHICLES_MONTH_QUERY
} from "../actionTypes"
import  axios from 'axios'
import api from "../../environments/environment";
import {
  isAdmin,
  isLamata,
  isOperator,
  isPartner,
  OperatorId,
  OperatorName,
  PartnerId
} from "../../environments/constants";



export const getVehicles = () => async dispatch => {
  let VehicleApi;
  if(isAdmin || isLamata) {
    VehicleApi = `${api.vehicle}/api/vehicles/`
  }else if(isOperator) {
    VehicleApi = `${api.vehicle}/api/operators/?operator=${OperatorId}`
  } else if(isPartner) {
    VehicleApi = `${api.vehicle}/api/partners/?partner=${PartnerId}`
  }
  try {
    dispatch(isLoading());
    const res = await axios.get(VehicleApi);
    dispatch({
      type: VEHICLE_BY_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });

  }
};


export const getVehiclesRequestAll = () => async dispatch => {
  try {
    dispatch(isLoading());
    const res = await axios.get(`${api.vehicle}/api/request/?operator=All`);
    dispatch({
      type: VEHICLE_BY_ALL,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });

  }
};

export const getVehiclesRequestMe = () => async dispatch => {
  try {
    dispatch(isLoading());
    const res = await axios.get(`${api.vehicle}/api/request/?operator=${OperatorId}`);
    dispatch({
      type: VEHICLE_BY_ME,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });

  }
};


export const createVehicle = (vehicle_make, vehicle_model, mode, plate_number, capacity, operator, partner) => async dispatch => {
  const body = {
    vehicle_make, vehicle_model, mode, plate_number, capacity, operator, partner
   };
  try {
    const res = await axios.post(`${api.vehicle}/api/me/vehicles/`, body);
    dispatch({
      type: CREATE_VEHICLE,
      payload: res.data
    });

      if(res.data && (isAdmin || isOperator)) {
        await axios.put(`${api.vehicle}/api/approve/${res.data.id}/`)
      }

    dispatch(getVehicles());
    dispatch(toggleVehicleModalCreate());
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    dispatch(toggleVehicleModalCreate());
    setTimeout(() => dispatch({
      type: REMOVE_VEHICLE_ERROR
    }), 5000)

  }
};

export const updateVehicle = (id,vehicle_make, vehicle_model, mode, plate_number, capacity, operator) => async dispatch => {
  const body = {
    vehicle_make, vehicle_model, mode, plate_number, capacity, operator
  };
  try {
    const res = await axios.put(`${api.vehicle}/api/vehicles/${id}/`, body);
    dispatch({
      type: UPDATE_VEHICLE,
      payload: res.data
    });
    dispatch(getVehicles());
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    // dispatch(toggleVehicleModalCreate());
    setTimeout(() => dispatch({
      type: REMOVE_VEHICLE_ERROR
    }), 5000)

  }
};
export const deleteVehicle = (id) => async dispatch => {

  try {
    const res = await axios.delete(`${api.vehicle}/admin/vehicles/${id}/`);
    dispatch({
      type: DELETE_VEHICLE,
      payload: res.data
    });
    dispatch(getVehicles());
    dispatch(closeVehicleModalDelete());
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    dispatch(closeVehicleModalDelete());
    setTimeout(() => dispatch({
      type: REMOVE_VEHICLE_ERROR
    }), 5000)
  }
};

  export const changeVehicleStatus = (id, status) => async dispatch => {
    try {
      const res = await axios.put(`${api.vehicle}/api/status/${id}/`, {status});
      dispatch({
        payload: res.data,
        type: VEHICLE_STATUS,
      });
      dispatch(getVehicles());
    } catch (err) {
      dispatch({
        type: VEHICLE_ERROR,
        payload: "Opps! Something Went Wrong Try Again"
      });
      setTimeout(() => dispatch({
        type: REMOVE_VEHICLE_ERROR
      }), 5000)
    }
  };
export const searchVehicle = (id) => async dispatch => {
  try {
    dispatch(isLoading());
    const res = await axios.get(`${api.vehicle}/api/vehicles/${id}/`);
    dispatch({
      type: SEARCH_VEHICLE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: "Vehicle not Available"
    });
  }
};


export function toggleVehicleModalCreate() {
  return {
    type: VEHICLE_MODAL_CREATE
  };
}

export function toggleVehicleModalDelete(id) {
  return {
    type: VEHICLE_MODAL_DELETE,
    payload: id
  };
}

export function toggleVehicleUpdate(id) {
  return {
    type: VEHICLE_MODAL_UPDATE,
    payload: id
  };
}

export function closeVehicleModalDelete() {
  return {
    type: CLOSE_MODAL_DELETE_VEHICLE,
  };
}

export function isLoading() {
  return {
    type: LOADING_VEHICLE,
  };
}



export const setRequestMe= (id) => async dispatch => {
  try {
  await axios.put(`${api.vehicle}/api/approve/${id}/`);

    dispatch(getVehiclesRequestMe());
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    setTimeout(() => dispatch({
      type: REMOVE_VEHICLE_ERROR
    }), 5000)
  }
};

export const rejectRequestMe= (id) => async dispatch => {
  try {
    await axios.put(`${api.vehicle}/api/operators/${id}/?operator=All`);

    dispatch(getVehiclesRequestMe());
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    setTimeout(() => dispatch({
      type: REMOVE_VEHICLE_ERROR
    }), 5000)
  }
};


export const RequestAll= (id) => async dispatch => {
  try {
    await axios.put(`${api.vehicle}/api/operators/${id}/?operator=${OperatorId}`);
    await axios.put(`${api.vehicle}/api/approve/${id}/`);

    dispatch(getVehiclesRequestAll());
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: "Opps! Something Went Wrong Try Again"
    });
    setTimeout(() => dispatch({
      type: REMOVE_VEHICLE_ERROR
    }), 5000)
  }
};

export const getVehiclesMonthQuery = (year) => async dispatch => {
  try {
    const res = await axios.get(`${api.vehicle}/api/monthquery/?year=${year}`)
    dispatch({
      type: VEHICLES_MONTH_QUERY,
      payload: res.data
    });
  } catch (err) {}
};



