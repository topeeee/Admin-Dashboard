import {
  ZONE_BY_USER,
  ZONE_MODAL_CREATE,
  ZONE_MODAL_UPDATE,
  CREATE_ZONE,
  UPDATE_ZONE,
  LOADING_ZONE
} from "../actionTypes"
import  axios from 'axios'
import api from "../../environments/environment";
import {isOperator, OperatorId} from "../../environments/constants";



export const ZoneUser = () => async dispatch => {
  try {
    dispatch(isLoading());
    const operatorZones = [];
    const res = await axios.get(`${api.zone}/api/zones/`);
    if(isOperator && res.data.length > 0) {
      const res1 = await axios.get(`${api.operatorZone}/api/operatorzones/?search=${OperatorId}`);
      if(res1.data.length > 0) {
        res1.data.map(operatorZone => {
          res.data.map(zone => {
            if(zone.id == operatorZone.zoneCode){
              operatorZones.push(zone)
            }
          })
        })
      }
    }
    dispatch({
      type: ZONE_BY_USER,
      payload: isOperator ? operatorZones : res.data
    });
  } catch (err) {}
};

export const createZone = (zonecode, zone, statecode) => async dispatch => {
  const body = {zonecode, zone, statecode};
  try {
    const res = await axios.post(`${api.zone}/api/me/zones/`, body);
    dispatch({
      type: CREATE_ZONE,
      payload: res.data
    });
    dispatch(ZoneUser());
    dispatch(toggleZoneModalCreate());
  } catch (err) {}
};


export const updateZone = (id, zonecode, zone, statecode) => async dispatch => {
  const body = {zonecode, zone, statecode};
  try {
    const res = await axios.put(`${api.zone}/api/zones/${id}/`, body);
    dispatch({
      type: UPDATE_ZONE,
      payload: res.data
    });
    dispatch(ZoneUser());
    dispatch(toggleZoneModalUpdate());
  } catch (err) {}
};


export function toggleZoneModalCreate() {
  return {
    type: ZONE_MODAL_CREATE
  };
}

export function toggleZoneModalUpdate(id) {
  return {
    type: ZONE_MODAL_UPDATE,
    payload: id
  };
}

export function isLoading() {
  return {
    type: LOADING_ZONE,
  };
}
