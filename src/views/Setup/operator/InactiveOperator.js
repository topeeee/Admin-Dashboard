import React, {useEffect, useState} from 'react';
import {connect} from "react-redux"
import {Badge, Card, CardBody, CardHeader, Col, Row, Table, Input} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelopeSquare, faFilePdf, faPrint} from "@fortawesome/free-solid-svg-icons";
import {
  getOperatorModes,
  getOperators,
  getOperatorServices,
  getOperatorStations,
  searchOperator
} from "../../../store/actions/operatorAction";
import OperatorHeader from "./components/OperatorHeader";
import Spinner from "../../../spinner/Spinner";
import OperatorActionBtn from "./components/OperatorActionBtn";
import {isAdmin} from "../../../environments/constants";
import {getVehicles} from "../../../store/actions/vehicleAction";
import {BusStopUser} from "../../../store/actions/busStopAction";
import {ZoneUser} from "../../../store/actions/zoneAction";
import {getModes} from "../../../store/actions/modeAction";
import {getService} from "../../../store/actions/serviceAction";




function UserRow(props) {
  const user = props.user;
  const operatorModes = props.operatorModes;
  const operatorServices = props.operatorServices;
  const services = props.services;
  const modes = props.modes


  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'danger' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  };

  function operatorMode(operatorName) {
    let operatorModeArr = [];
    if(operatorModes && modes) {
      operatorModes.forEach(operatorMode => {
        if(operatorMode.operator_name == operatorName) {
          modes.map(mode=> {
            if(mode.id == operatorMode.modecode) {
              operatorModeArr.push(mode.mode)
            }
          })
        }
      })
    }
    if(operatorModeArr.length > 0) {
      return operatorModeArr.join(", ")
    } else {
      return  operatorModeArr = ['Not Available'].join(", ")
    }
  }

  function operatorService(operatorName) {
    let operatorServiceArr = [];
    if(operatorServices && services) {
      operatorServices.forEach(operatorService => {
        if(operatorService.operator_name == operatorName) {
          services.map(service=> {
            if(service.id == operatorService.servicecode){
              operatorServiceArr.push(service.service)
            }
          })

        }
      })
    }
    if(operatorServiceArr.length > 0) {
      return operatorServiceArr.join(", ")
    } else {
      return  operatorServiceArr = ['Not Available'].join(", ")
    }
  }

  return (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.phoneNo}</td>
      {/*{vehicles ? <td>{vehicles.filter(vehicle => vehicle.operator === user.name).length}</td>*/}
      {/* :<td>0</td>}*/}
      {(operatorModes && user ) && <td>{operatorMode(user.id)}</td>}
      {(operatorServices && user ) && <td>{operatorService(user.id)}</td>}
      {(user.status === "1") && <td><Badge color={getBadge("Active")}>Active</Badge></td> }
      {(user.status === "0") && <td><Badge color={getBadge("Inactive")}>Inactive</Badge></td> }
      {(user.status === "") && <td><Badge color={getBadge("Pending")}>Pending</Badge></td> }
      <td> <OperatorActionBtn id={user.id} user={user} /> </td>
    </tr>
  )
}

const InActiveOperators = ({getOperators, operators, operator, isLoading,  searchOperator, error, vehicles, getVehicles, getOperatorStations, getOperatorServices, getOperatorModes,  operatorServices,  operatorModes,  operatorStations, services, getService, modes, getModes}) => {
  const [formData, setFormData] = useState('');

  useEffect(()=>{
    if(formData === ''){
      getOperators()
    }
  },[formData]);

  useEffect(()=>{
    getVehicles();
    getOperatorModes();
    getOperatorServices();
    getOperatorStations();
    getService();
    getModes();
  },[operators]);


  const onChange = (e) =>{
    e.preventDefault();
    setFormData(e.target.value );
  };


  const onSearch = e => {
    e.preventDefault();
    searchOperator(formData)

  };
// console.log(operatorModes)
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader className="bg-secondary d-flex">
              <div className="w-75 d-flex align-items-center ">
                <form className="w-100 d-flex align-items-center" onSubmit={onSearch}>
                  <Input type="text"
                    // placeholder="Search by Id"
                         className="w-25"
                         name="formData"
                         value={formData}
                         onChange={onChange}
                  />
                  <button className="btn btn-success" type="submit">Search</button>
                </form>
              </div>
              <div className="w-25 text-right">
                <FontAwesomeIcon className="text-warning py-2" title="Print" style={{fontSize: 40,  cursor: "pointer"}} icon={faPrint} onClick={()=> window.print()} />
                <FontAwesomeIcon className="text-primary py-2" title="Send to Email" style={{fontSize: 40,  cursor: "pointer"}} icon={faEnvelopeSquare} />
                <FontAwesomeIcon className="text-danger py-2" title="Download Pdf" style={{fontSize: 40,  cursor: "pointer"}} icon={faFilePdf} />
              </div>
            </CardHeader>
            <CardHeader className="d-flex align-items-center" >
              <div className="w-25">
                Operators
              </div>
              <OperatorHeader />
            </CardHeader>
            {isLoading && <Spinner />}
            {!isLoading &&
            <CardBody>
              {/*{error && <div className="animated fadeIn pt-1 text-center text-danger mb-2 font-italic">{error}</div>}*/}
              {/*{isLoading && loading()}*/}
              {(operators && operators.length === 0) &&
              <div className="animated fadeIn pt-1 text-center">No Operator Available</div>}
              {((operators && operators.length > 0) || operator) &&
              <Table responsive hover>
                <thead className={isAdmin? 'bg-dark': 'bg-twitter'} style={{color: '#696969'}}>
                <tr>
                  {/*<th scope="col">Id</th>*/}
                  {/*<th scope="col">Area Code</th>*/}
                  <th scope="col">Company Name</th>
                  <th scope="col">Company Phone</th>
                  <th scope="col">Mode(s)</th>
                  <th scope="col">Service(s)</th>
                  {/*<th scope="col">Number of Vehicles</th>*/}
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {operators && operators.sort((a, b) => parseFloat(b.id) - parseFloat(a.id)).filter((user) => user.status == 0).map((operator, index) =>
                  <UserRow key={index} user={operator} vehicles={vehicles}  operatorModes={operatorModes} operatorServices={operatorServices} services={services}  modes={modes}/>
                )}
                {operator &&
                <UserRow user={operator}/>
                }
                </tbody>
              </Table>
              }
            </CardBody>
            }
          </Card>
        </Col>
      </Row>
    </div>
  )
};
function mapDispatchToProps(dispatch) {
  return {
    getOperators: () => dispatch(getOperators()),
    searchOperator: (id) => dispatch(searchOperator(id)),
    getVehicles: () => dispatch(getVehicles()),
    getOperatorStations: () => dispatch(getOperatorStations()),
    getOperatorServices: () => dispatch(getOperatorServices()),
    getOperatorModes: () => dispatch(getOperatorModes()),
    BusStopUser: () => dispatch(BusStopUser()),
    ZoneUser: () => dispatch(ZoneUser()),
    getModes: () => dispatch(getModes()),
    getService: () => dispatch(getService()),
  };
}

const mapStateToProps = state => ({
  operators: state.operator.operators,
  operator: state.operator.operator,
  error: state.operator.error,
  isLoading: state.operator.isLoading,
  vehicles: state.vehicle.vehicles,
  operatorServices: state.operator.operatorServices,
  operatorStations: state.operator.operatorStations,
  operatorModes: state.operator.operatorModes,
  busStops: state.busStop.busStops,
  zones: state.zone.zones,
  modes: state.mode.modes,
  services: state.service.services,


});

export default connect(mapStateToProps,mapDispatchToProps)(InActiveOperators);







