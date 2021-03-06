import React, {useEffect, useState} from 'react';
import {Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import {getOperators, searchOperator} from "../../../store/actions/operatorAction";
import {connect} from "react-redux";
import axios from "axios"
import api from "../../../environments/environment";
import {isAdmin, isLamata} from "../../../environments/constants";


const Operator = ({getOperators, operators, operator, isLoading,  searchOperator, error, match, states})=> {
  const [newOperator, setNewOperator] = useState({});
  const [operatorVehicle, setOperatorVehicle] = useState([]);
  const [operatorZone, setOperatorZone] = useState([]);
  const [operatorMode, setOperatorMode] = useState([]);

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'danger' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  };

  function getOperatorVehicle() {
    axios.get(`${api.operatorVehicleTypes}/api/operators/?operatorId=${match.params.id}`)
      .then(res=> {
        setOperatorVehicle(res.data);
      })
  }
  function getOperatorMode() {
    axios.get(`${api.operatorMode}/api/mode/?operator_name=${newOperator.name}`)
      .then(res=> {
        setOperatorMode(res.data);
      })
  }

  function getOperatorZone() {
    axios.get(`${api.operatorZone}/api/operators/?operatorId=${match.params.id}`)
      .then(res=> {
        setOperatorZone(res.data);
      })
  }

  function setOperator() {
    if (operators){
      operators.map(op=> {
        if(op.id == match.params.id){
          setNewOperator(op)
        }
      })
    }
  }
  useEffect(()=>{
    getOperators();
    getOperatorVehicle();
    getOperatorZone()
  },[]);

useEffect(()=>{
  setOperator();
},[operators]);

  useEffect(()=>{
  if(newOperator.name) {
    getOperatorMode()
  }
  },[newOperator]);
  // const user = operators.find( user => user.id === this.props.match.params.id);

    // const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

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
                  {newOperator &&
                  <tbody>
                  <tr>
                    <td><strong>Operator Name</strong></td>
                    <td>{newOperator.name}</td>
                  </tr>
                  <tr className="w-100">
                    <td><strong>Operator Phone</strong></td>
                    <td>{newOperator.phoneNo}</td>
                  </tr>
                  <tr>
                    <td><strong>Operator Email</strong></td>
                    <td>{newOperator.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Office Address</strong></td>
                    <td>{newOperator.officeAddress}</td>
                  </tr>
                  <tr>
                    <td><strong>Number of Vehicles</strong></td>
                    <td>{newOperator.numberOfVehicle}</td>
                  </tr>
                  <tr>
                    <td><strong>Operator Email</strong></td>
                    <td>{newOperator.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Vehicle Type</strong></td>
                    {operatorVehicle && operatorVehicle.map((vehicle, index) =>
                      <td  key={index}>{vehicle.vehicleType}</td>
                    )}
                  </tr>
                  <tr>
                    <td><strong>Mode</strong></td>
                    {operatorMode && operatorMode.map((mode, index) =>
                      <td  key={index}>{mode.modecode}</td>
                    )}
                  </tr>
                  <tr>
                    <td><strong>Zone</strong></td>
                    {operatorZone && operatorZone.map((zone, index) =>
                      <td  key={index}>{zone.zoneCode}</td>
                    )}
                  </tr>
                  <tr>
                    <td><strong>State</strong></td>
                    {states && states.map((state, index) =>
                      <td  key={index}>{state.xstate}</td>
                    )}
                  </tr>
                  <tr>
                    <td><strong>Status</strong></td>
                    {(newOperator.status === "1") && <td><Badge color={getBadge("Active")}>Active</Badge></td> }
                    {(newOperator.status === "0") && <td><Badge color={getBadge("Inactive")}>Inactive</Badge></td> }
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
  };
}

const mapStateToProps = state => ({
  drivers: state.driver.drivers,
  operators: state.operator.operators,
  operator: state.operator.operator,
  error: state.operator.error,
  isLoading: state.operator.isLoading,
  states: state.state.states,


});

export default connect(mapStateToProps,mapDispatchToProps)(Operator);
