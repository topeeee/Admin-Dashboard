import React, {useEffect, useState} from 'react';
import {Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import {connect} from "react-redux";
import axios from "axios"
import {getDrivers} from "../../store/actions/driverAction";
import api from "../../environments/environment";
import {isAdmin} from "../../environments/constants";


const Operator = ({getDrivers, match, drivers})=> {
  const [newOperator, setNewOperator] = useState({});
  const [driverVehicle, setDriverVehicle] = useState([]);
  const [vehicleId, setVehicleId] = useState('');
  const [vehicle, setVehicle] = useState({});

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Refunds' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Inactive' ? 'danger' :
            'primary'
  };


  function setDriver() {
    if (drivers){
      drivers.map(op=> {
        if(op.id == match.params.id){
          setNewOperator(op);
        }
      })
    }
  }
 async function getDriverVehicle() {
   try {
   const res = await  axios.get(`${api.driverVehicles}/api/drivervehicles/`)
     setDriverVehicle(res.data)
   }catch (e) {

   }
  }

  async function getVehicle(id) {
    try {
    const res = await  axios.get(`${api.vehicle}/api/vehicles/${id}/`)
      setVehicle(res.data)
    }catch (e) {

    }
  }

  useEffect(()=>{
    getDrivers();
    getDriverVehicle();
  },[]);

  useEffect(()=>{
    setDriver();
  },[drivers]);

  useEffect(()=> {
    if(vehicleId) {
      getVehicle(vehicleId)
    }
  },[vehicleId]);


  useEffect(()=> {
    if(match.params.id && driverVehicle){
      driverVehicle.map((driver=> {
        if(driver.driverId == match.params.id){
          setVehicleId(driver.vehicleId);
        }
      }))
    }
  },[match.params.id, driverVehicle]);

  return (
    <div className="animated fadeIn">
      <Row className="d-flex align-items-center justify-content-center">
        <Col lg={6}>
          <Card>
            <CardHeader className={isAdmin? 'bg-dark': 'bg-twitter'} style={{color: '#696969'}}>
              <strong className="text-white"><i className="icon-info pr-1"></i>Driver id: {match.params.id}</strong>
            </CardHeader>
            <CardBody >
              <Table>
                {newOperator &&
                <tbody>
                <tr>
                  <td><strong>Driver  FirstName</strong></td>
                  <td>{newOperator.firstname}</td>
                </tr>
                  <tr className="w-100">
                    <td><strong>Driver LastName</strong></td>
                    <td>{newOperator.lastname}</td>
                  </tr>
                <tr className="w-100">
                  <td><strong>Driver Phone</strong></td>
                  <td>{newOperator.phoneno}</td>
                </tr>
                <tr>
                  <td><strong>Driver Email</strong></td>
                  <td>{newOperator.email}</td>
                </tr>
                <tr>
                  <td><strong>Driver Address</strong></td>
                  <td>{newOperator.residentialaddress}</td>
                </tr>
                <tr>
                  <td><strong>App Status</strong></td>
                  {(newOperator.appstatus === "1") && <td><Badge color={getBadge("Active")}>online</Badge></td> }
                  {(newOperator.appstatus === "0") && <td><Badge color={getBadge("Inactive")}>offline</Badge></td> }
                  {(newOperator.appstatus === "") && <td><Badge color={getBadge("Refunds")}>not available</Badge></td> }
                </tr>
                <tr>
                  <td><strong>Bank Name</strong></td>
                  <td>{newOperator.bankname}</td>
                </tr>
                <tr>
                  <td><strong>Account Name</strong></td>
                  <td>{newOperator.accountname}</td>
                </tr>
                <tr>
                  <td><strong>Account Number</strong></td>
                  <td>{newOperator.accountnumber}</td>
                </tr>
                <tr>
                  <td><strong>Vehicle Plate No</strong></td>
                  <td>{vehicle.plate_number}</td>
                </tr>
                <tr>
                  <td><strong>Vehicle Make</strong></td>
                  <td>{vehicle.vehicle_make}</td>
                </tr>
                <tr>
                  <td><strong>Vehicle Model</strong></td>
                  <td>{vehicle.vehicle_model}</td>
                </tr>
                <tr>
                  <td><strong>Mode</strong></td>
                  <td>{vehicle.mode}</td>
                </tr>
                <tr>
                  <td><strong>Route</strong></td>
                  <td>{newOperator.route}</td>
                </tr>
                <tr>
                  <td><strong>Area</strong></td>
                  <td>{newOperator.area}</td>
                </tr>
                <tr>
                  <td><strong>Zone</strong></td>
                  <td>{newOperator.zone}</td>
                </tr>
                <tr>
                  <td><strong>Operator</strong></td>
                  <td>{newOperator.operatorid}</td>
                </tr>
                <tr>
                  <td><strong>Status</strong></td>
                  {(newOperator.status === "1") && <td><Badge color={getBadge("Active")}>Active</Badge></td> }
                  {(newOperator.status === "0") && <td><Badge color={getBadge("Inactive")}>Inactive</Badge></td> }
                  {(newOperator.status === "") && <td><Badge color={getBadge("Pending")}>Pending</Badge></td> }
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
    getDrivers: () => dispatch(getDrivers()),
  };
}

const mapStateToProps = state => ({
  drivers: state.driver.drivers,
});

export default connect(mapStateToProps,mapDispatchToProps)(Operator);
