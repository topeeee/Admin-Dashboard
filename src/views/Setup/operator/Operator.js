import React, {useEffect, useState} from 'react';
import {Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import {getOperators, searchOperator} from "../../../store/actions/operatorAction";
import {connect} from "react-redux";
import axios from "axios"
import api from "../../../environments/environment";
import {getVehicles} from "../../../store/actions/vehicleAction";
import {isAdmin, isLamata} from "../../../environments/constants";
import {BusStopUser} from "../../../store/actions/busStopAction";
import {ZoneUser} from "../../../store/actions/zoneAction";
import {getModes} from "../../../store/actions/modeAction";
import {getService} from "../../../store/actions/serviceAction";


const Operator = (props)=> {

  const {
    getOperators,
    operators,
    match,
    modes,
    vehicles,
    getVehicles,
    busStops,
    BusStopUser,
    zones,
    ZoneUser,
    getModes,
    services,
    getService
  } = props

  const [operator, setOperator] = useState({});
  const [operatorZone, setOperatorZone] = useState([]);
  const [zone, setZone] = useState('');
  const [operatorStation, setOperatorStation] = useState([]);
  const [station, setStation] = useState('')
  const [operatorMode, setOperatorMode] = useState([]);
  const [mode, setMode] = useState('');
  const [operatorService, setOperatorService] = useState([])
  const [service, setService] = useState('')
  const [suspension, setSuspension] = useState('');
  const [penalty, setPenalty] = useState('')

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'danger' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  };


 async function getOperatorMode() {
   const modeArray = [];
    try {
    const res = await  axios.get(`${api.operatorMode}/api/mode/?operator_name=${operator.id}`);
    res.data.map(mode=> {
      modeArray.push(mode.modecode)
    })
      setOperatorMode(modeArray);
    }catch (e) {

    }
  }

 async function getOperatorZone() {
   const zoneArray = [];
   try {
     const res = await axios.
     get(`${api.operatorZone}/api/operators/?operatorId=${match.params.id}`)
     res.data.map(zone=> {
       zoneArray.push(zone.zoneCode)
     })
     setOperatorZone(zoneArray);

   } catch (e) {

   }
 }


  async function getOperatorStation() {
    const stationArray = [];
    try {
      const res = await axios.get(`${api.operatorStation}/api/station/?operator_name=${operator.id}`)
      res.data.map(station=> {
        stationArray.push(station.stationcode)
      })
      setOperatorStation(stationArray);
    }catch (e) {

    }
  }

  async function getOperatorService() {
    const serviceArray = [];
    try {
      const res = await axios.get(`${api.operatorService}/api/mode/?operator_name=${operator.id}`)
      res.data.map(service=> {
        serviceArray.push(service.servicecode)
      })
      setOperatorService(serviceArray);
    }catch (e) {

    }
  }




  async function getComment() {
    try {
      const res = await axios.get(`${api.comment}/api/query/comments?role=Operator&userId=${match.params.id}`)
      setSuspension(res.data[0].comment)
      setPenalty(res.data[0].commentType)
    }catch (e) {}
  }

  function getOperator() {
    if (operators){
      operators.map(operator=> {
        if(operator.id == match.params.id){
          setOperator(operator)
        }
      })
    }
  }
  useEffect(()=>{
    getOperators();
    getComment();
    getVehicles();
    BusStopUser();
    ZoneUser();
    getModes();
    getService();
  },[]);

useEffect(()=>{
  getOperator();
},[operators]);

  useEffect(()=>{
  if(operator.name) {
    getOperatorMode()
    getOperatorZone();
    getOperatorStation();
    getOperatorService();
  }
  },[operator]);


  useEffect(()=> {
    if(operatorStation && busStops) {
      const station = [];
      operatorStation.forEach(operatorstation=> {
        busStops.map(busStop => {
          if(busStop.id == operatorstation) {
            station.push(busStop.station)
          }
        })
      })
      setStation(station.join(","))
    }
  },[operatorStation, busStops])

  useEffect(()=> {
    if(operatorZone && zones) {
      const zoneA = [];
      operatorZone.forEach(operatorzone=> {
        zones.map(zone => {
          if(zone.id == operatorzone) {
            zoneA.push(zone.zone)
          }
        })
      })
      setZone(zoneA.join(","))
    }
  },[operatorZone, zones])

  useEffect(()=> {
    if(operatorMode && modes) {
      const modeA = [];
      operatorMode.forEach(operatormode=> {
        modes.map(mode => {
          if(mode.id == operatormode) {
            modeA.push(mode.mode)
          }
        })
      })
      setMode(modeA.join(","))
    }
  },[operatorMode, modes])

  useEffect(()=> {
    if(operatorService && services) {
      const serviceA = [];
      operatorService.forEach(operatorservice=> {
        services.map(service => {
          if(service.id == operatorservice) {
            serviceA.push(service.service)
          }
        })
      })
      setService(serviceA.join(","))
    }
  },[operatorService, services])

    return (
      <div className="animated fadeIn">
        <Row className="d-flex align-items-center justify-content-center">
          <Col lg={6}>
            <Card>
              <CardHeader className={isAdmin? 'bg-dark': 'bg-twitter'} style={{color: '#696969'}}>
                <strong className="text-white"><i className="icon-info pr-1"></i>User id: {match.params.id}</strong>
              </CardHeader>
              <CardBody >
                <Table>
                  {operator &&
                  <tbody>
                  <tr>
                    <td><strong>Company Name</strong></td>
                    <td>{operator.name}</td>
                  </tr>
                  <tr className="w-100">
                    <td><strong>Company Phone</strong></td>
                    <td>{operator.phoneNo}</td>
                  </tr>
                  <tr>
                    <td><strong>Company Email</strong></td>
                    <td>{operator.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Office Address</strong></td>
                    <td>{operator.officeAddress}</td>
                  </tr>
                  <tr>
                    <td><strong>Number of Vehicles</strong></td>
                    {(vehicles && operator.name) ? <td>{vehicles.filter(vehicle => vehicle.operator === operator.name).length}</td>
                      :<td>0</td>}
                  </tr>
                  <tr>
                    <td><strong>Company Email</strong></td>
                    <td>{operator.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Contact Person Name</strong></td>
                    <td>{operator.contactName}</td>
                  </tr>
                  <tr>
                    <td><strong>Contact Person Phone</strong></td>
                    <td>{operator.contactPhoneNo}</td>
                  </tr>
                  <tr>
                    <td><strong>Contact Person Email</strong></td>
                    <td>{operator.contactEmail}</td>
                  </tr>
                  <tr>
                    <td><strong>Mode(s)</strong></td>
                    <td>{operatorMode.length > 0 ? mode: 'Not Available'}</td>
                  </tr>
                  <tr>
                    <td><strong>Zone(s)</strong></td>
                    <td>{operatorZone.length > 0 ? zone: 'Not Available'}</td>
                  </tr>
                  {operatorStation ? <tr>
                    <td><strong>Station(s)</strong></td>
                    <td>{station}</td>
                  </tr>:null}
                  <tr>
                    <td><strong>Service(s)</strong></td>
                    <td>{operatorService.length > 0 ? service: 'Not Available'}</td>
                  </tr>
                  {/*<tr>*/}
                  {/*  <td><strong>State</strong></td>*/}
                  {/*  {states && states.map((state, index) =>*/}
                  {/*    <td  key={index}>{state.xstate}</td>*/}
                  {/*  )}*/}
                  {/*</tr>*/}
                  {operator.status === "0"?
                    <tr>
                      <td><strong>Reason for Suspension</strong></td>
                      <td>{suspension}</td>
                    </tr>
                  : null}

                  {operator.status === "0"?
                    <tr>
                      <td><strong>Penalty</strong></td>
                      <td>{penalty}</td>
                    </tr>
                    : null}
                    <tr>
                    <td><strong>Status</strong></td>
                    {(operator.status === "1") && <td><Badge color={getBadge("Active")}>Active</Badge></td> }
                    {(operator.status === "0") && <td><Badge color={getBadge("Inactive")}>Inactive</Badge></td> }
                      {(operator.status === "") && <td><Badge color={getBadge("Pending")}>Pending</Badge></td> }
                  </tr>
                  </tbody>
                  }

                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )

}

function mapDispatchToProps(dispatch) {
  return {
    getOperators: () => dispatch(getOperators()),
    searchOperator: (id) => dispatch(searchOperator(id)),
    getVehicles: () => dispatch(getVehicles()),
    BusStopUser: () => dispatch(BusStopUser()),
    ZoneUser: () => dispatch(ZoneUser()),
    getModes: () => dispatch(getModes()),
    getService: () => dispatch(getService()),
  };
}

const mapStateToProps = state => ({
  drivers: state.driver.drivers,
  operators: state.operator.operators,
  error: state.operator.error,
  isLoading: state.operator.isLoading,
  states: state.state.states,
  vehicles: state.vehicle.vehicles,
  busStops: state.busStop.busStops,
  zones: state.zone.zones,
  modes: state.mode.modes,
  services: state.service.services,



});

export default connect(mapStateToProps,mapDispatchToProps)(Operator);
