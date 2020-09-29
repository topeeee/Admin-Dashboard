import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import { connect } from "react-redux";
import {toggleDriverModalUpdate, getDrivers, updateDriver} from "../../store/actions/driverAction";
import {ZoneUser} from "../../store/actions/zoneAction";
import {RouteUser} from "../../store/actions/routeAction";
import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.esm";
import  axios from "axios";
import {getOperators} from "../../store/actions/operatorAction";
import {getVehicles} from "../../store/actions/vehicleAction";
import {getAreas} from "../../store/actions/areaAction";
import api from "../../environments/environment";
// import {BusStopUser} from "../../store/actions/busStopAction";

const animatedComponents = makeAnimated();

const options = [
  { value: 'Bus', label: 'Zone1' },
  { value: 'Car', label: 'Zone2' },
  { value: 'MiniVan', label: 'Zone3' }
];




function mapDispatchToProps(dispatch) {
  return {
    toggleDriverModalUpdate: () => dispatch(toggleDriverModalUpdate()),
    updateDriver: (id, operatorId, firstname, lastname, residentialaddress, email, phoneno, status, pin, bankname, accountname, accountnumber, zone, area, route, geofencedarea, appstatus) =>
      dispatch(updateDriver(id, operatorId, firstname, lastname, residentialaddress, email, phoneno, status, pin, bankname, accountname, accountnumber, zone, area, route, geofencedarea, appstatus)),
    ZoneUser: () => dispatch(ZoneUser()),
    RouteUser: () => dispatch(RouteUser()),
    getOperators: () => dispatch(getOperators()),
    getVehicles: () => dispatch(getVehicles()),
    getAreas: () => dispatch(getAreas()),
    getDrivers: () => dispatch(getDrivers()),

  };
}


const mapStateToProps = state => ({
  driverModalUpdate: state.driver.DriverModalUpdate,
  zones: state.zone.zones,
  routes: state.route.routes,
  isAuthenticated: state.auth.isAuthenticated,
  operators: state.operator.operators,
  vehicles: state.vehicle.vehicles,
  areas: state.area.areas,
  drivers: state.driver.drivers,
  UpdateDriverId: state.driver.UpdateDriverId,


});

const DriverModalUpdate = (props) => {
  const {
    className,
    toggleDriverModalUpdate,
    driverModalUpdate,
    updateDriver,
    routes,
    ZoneUser,
    RouteUser,
    isAuthenticated,
    operators,
    getOperators,
    vehicles,
    getVehicles,
    getAreas,
    areas,
    drivers,
    getDrivers,
    UpdateDriverId
  } = props;

 async function getOperatorZone() {
   try {
   const res = await  axios.get(`${api.operatorZone}/api/all/operatorzones/`);
     setOperatorZone(res.data);
   }catch (e) {

   }
  }

 async function getOperatorMode() {
    try {
     const res = await axios.get(`${api.operatorMode}/api/me/operatormodes/`);
      setOperatorMode(res.data);
    }catch (e) {

    }
  }

  useEffect(()=>{
    if(isAuthenticated) {
      RouteUser();
      ZoneUser();
      getOperators();
      getVehicles();
      getAreas();
      getDrivers();
      getOperatorZone();
      getOperatorMode();
    }
  }, []);

  const [formData, setFormData] = useState({
    firstname: "", lastname: "", residentialaddress: "", email: "", phoneno: "", status: "", pin: "", bankname: "", accountname: "", accountnumber: "", zone: "", area: "", route: "", geofencedarea: "", appstatus: ""
  });
  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);
  const [form4, setForm4] = useState(false);
  const [routeSelected, setRouteSelected] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const [regPin, setRegpin] = useState('');
  const [operatorInput, setOperatorInput] = useState('');
  const [vehicleInput, setVehicleInput] = useState('');
  const [plateInput, setPlateInput] = useState('');
  const [zoneInput, setZoneInput] = useState('');
  const [areaInput, setAreaInput] = useState('');
  const [routeInput, setRouteInput] = useState('');
  // const [modeInput, setModeInput] = useState('');
  const [operatorZone, setOperatorZone] = useState([]);
  const [operatorMode, setOperatorMode] = useState([]);
  const [operatorId, setOperatorId] = useState('');


  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });





  const onClickContinue1 = () => {
    // register();
    setForm1(false);
    setForm3(false);
    setForm2(true);
    setForm4(false);
  };

  const onClickContinue2 = () => {
    setForm1(false);
    setForm3(true);
    setForm2(false);
    setForm4(false);
  };
  const onClickContinue3 = () => {
    setForm1(false);
    setForm3(false);
    setForm2(false);
    setForm4(true);
  };

  const onClickBack1 = () => {
    setForm1(true);
    setForm3(false);
    setForm2(false);
    setForm4(false);
  };

  const onClickBack2 = () => {
    setForm1(false);
    setForm3(false);
    setForm2(true);
    setForm4(false);
  };
  const onClickBack3 = () => {
    setForm1(false);
    setForm3(true);
    setForm2(false);
    setForm4(false);
  };

  // useEffect(()=> {
  //   console.log(areas)
  // }, [areas]);

  const {
    firstname, lastname, residentialaddress, email, phoneno, status, pin, bankname, accountname, accountnumber, zone, area, route, geofencedarea, appstatus
  } = formData;



  const handleChange3 = (selected2) => {
    setSelected2(selected2);
  };
  const onSubmit = async (e) => {
     e.preventDefault();
    updateDriver(UpdateDriverId, operatorId, firstname, lastname, residentialaddress, email, phoneno, status, regPin, bankname, accountname, accountnumber, zoneInput, areaInput, routeInput, geofencedarea, appstatus);
    setFormData({
      firstname: "", lastname: "", residentialaddress: "", email: "", phoneno: "", status: "0", pin: "", bankname: "", accountname: "", accountnumber: "", zone: "", area: "", route: "", geofencedarea: "", appstatus: ""
    })

  };




  useEffect(()=> {
    if (routes && areaInput) {
      const body = [];
      routes.filter((user) => user.areacode === areaInput).forEach((res)=> {
        body.push({ value: res.route, label: res.route });
        setRouteSelected(body);
      })
    }
  }, [areaInput]);

  useEffect(()=> {
    if(routeSelected){
      const body = [];
      routeSelected.forEach(res=> {
        body.push(res.value);
        setRouteInput(body.toString())
      })
    }
  },[routeSelected]);

  function setDriver() {
    if (drivers){
      drivers.map(driver=> {
        if(driver.id === UpdateDriverId){
          setFormData({
            firstname: driver.firstName, lastname: driver.lastName, residentialddress: driver.residentialAddress, email: driver.email, phoneno: driver.phoneNo, status: "", pin: "", bankname: driver.bankName, accountname: driver.accountName, accountumber: driver.accountNumber, zone: "", area: "", route: "", geofencedarea: "", appstatus: ""
          });
          setZoneInput(driver.zone);
          setAreaInput(driver.area);
          setRouteInput(driver.route);
        }
      })
    }
  }

  useEffect(()=> {
    setDriver();
  },[UpdateDriverId]);

  useEffect(()=> {
    if(operators && operatorInput) {
      operators.map(operator=> {
        if(operator.name === operatorInput) {
          setOperatorId(operator.id)
        }
      })
    }
  },[operators, operatorInput]);


  const toggle = () => {toggleDriverModalUpdate()};

  return (
    <div>
      <Modal isOpen={driverModalUpdate} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} className="text-center">Update Driver</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            {form1 &&
            <FormGroup row>
              <Col md="6">
                <Label for="name" className="font-weight-bolder mb-0 text-info">First Name</Label>
                <Input type="text"  name="firstname" onChange={onChange} value={firstname}  required/>
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">Last Name</Label>
                <Input type="text"  name="lastname" onChange={onChange} value={lastname} required />
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">residentialaddress</Label>
                <Input type="text" name="residentialaddress" onChange={onChange} value={residentialaddress} required />
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">email</Label>
                <Input type="email" name="email" onChange={onChange} value={email} required />
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">phoneno</Label>
                <Input type="text"  name="phoneno" onChange={onChange} value={phoneno} required />
              </Col>
            </FormGroup>}
            {form2 &&
            <FormGroup row>
              <Col md="12">
                <Label for="name" className="font-weight-bold mb-0 text-info">Operator</Label>
                <Input
                  style={{cursor: 'pointer'}}
                  type="select"
                  name="operatorInput"
                  value={operatorInput}
                  onChange={e=>setOperatorInput(e.target.value)}
                  // required
                >
                  <option value="">Operator</option>

                  {operators && operators.map((operator, index) =>
                    <option value={operator.name} key={index}>{operator.name}</option>
                  )}
                </Input>
              </Col>
              <Col md="12">
                <Label for="name" className="font-weight-bold mb-0 text-info">Vehicle type</Label>
                <Input
                  style={{cursor: 'pointer'}}
                  type="select"
                  name="vehicleInput"
                  value={vehicleInput}
                  onChange={e=>setVehicleInput(e.target.value)}
                  // required
                >
                  <option value="">Vehicle type</option>
                  {(vehicles && operatorInput) && vehicles.filter((user) => user.operator === operatorInput).map((vehicle, index) =>
                    <option value={vehicle.mode} key={index}>{vehicle.mode}</option>
                  )}
                </Input>
              </Col>
              <Col md="12">
                <Label for="name" className="font-weight-bold mb-0 text-info">Vehicle Plate no</Label>
                <Input
                  style={{cursor: 'pointer'}}
                  type="select"
                  name="plateInput"
                  value={plateInput}
                  onChange={e=>setPlateInput(e.target.value)}
                  // required
                >
                  <option value="">Vehicle Plate no</option>
                  {(vehicles && vehicleInput) && vehicles.filter((user) => user.mode === vehicleInput).map((vehicle, index) =>
                    <option value={vehicle.plate_number} key={index}>{vehicle.plate_number}</option>
                  )}
                  {/*{routes && routes.map((route, index) =>*/}
                  {/*  <option value={route.routecode} key={index}>{route.routecode}</option>*/}
                  {/*)}*/}
                </Input>
              </Col>
            </FormGroup>}
            {form3 &&
            <FormGroup row>
              {/*<Col md="12">*/}
              {/*  <Label for="name" className="font-weight-bold mb-0 text-info">Mode</Label>*/}
              {/*  <Input*/}
              {/*    style={{cursor: 'pointer'}}*/}
              {/*    type="select"*/}
              {/*    name="zoneInput"*/}
              {/*    value={modeInput}*/}
              {/*    onChange={e=>setModeInput(e.target.value)}*/}
              {/*    // required*/}
              {/*  >*/}
              {/*    <option value="">select Mode</option>*/}
              {/*    {(operatorMode && operatorInput) && operatorMode.filter((user) => user.operator_name === operatorInput).map((mode, index) =>*/}
              {/*      <option value={mode.modecode} key={index}>{mode.modecode}</option>*/}
              {/*    )}*/}
              {/*  </Input>*/}
              {/*</Col>*/}
              <Col md="12">
                <Label for="name" className="font-weight-bold mb-0 text-info">Zone</Label>
                <Input
                  style={{cursor: 'pointer'}}
                  type="select"
                  name="zoneInput"
                  value={zoneInput}
                  onChange={e=>setZoneInput(e.target.value)}
                  // required
                >
                  <option value="">select Zone</option>
                  {(operatorZone && operatorInput) && operatorZone.filter((user) => user.operatorName === operatorInput).map((zone, index) =>
                    <option value={zone.zoneCode} key={index}>{zone.zoneCode}</option>
                  )}
                </Input>
              </Col>
              <Col md="12">
                <Label for="name" className="font-weight-bold mb-0 text-info">Area</Label>
                <Input
                  style={{cursor: 'pointer'}}
                  type="select"
                  name="areaInput"
                  value={areaInput}
                  onChange={e=>setAreaInput(e.target.value)}
                  // required
                >
                  <option value="">select Area</option>
                  {(areas && zoneInput) && areas.filter((user) => user.zonecode === zoneInput).map((area, index) =>
                    <option value={area.xarea} key={index}>{area.xarea}</option>
                  )}
                </Input>
              </Col>
              <Col md="12">
                <Label for="name" className="font-weight-bold mb-0 text-info">Route</Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={routeSelected}
                  value={selected2}
                  onChange={handleChange3}/>
                {/*<Input*/}
                {/*  style={{cursor: 'pointer'}}*/}
                {/*  type="select"*/}
                {/*  name="routeInput"*/}
                {/*  value={routeInput}*/}
                {/*  onChange={e=>setRouteInput(e.target.value)}*/}
                {/*  // required*/}
                {/*>*/}
                {/*  <option value="">select Route</option>*/}
                {/*  {(routes && areaInput) && routes.filter((user) => user.areacode === areaInput).map((route, index) =>*/}
                {/*    <option value={route.route} key={index}>{route.route}</option>*/}
                {/*  )}*/}
                {/*</Input>*/}
              </Col>
              {/*<Col md="12">*/}
              {/*  <Label for="name" className="font-weight-bold mb-0 text-info">Route</Label>*/}
              {/*  <Select*/}
              {/*    closeMenuOnSelect={false}*/}
              {/*    components={animatedComponents}*/}
              {/*    isMulti*/}
              {/*    options={modeSelected}*/}
              {/*    value={selected2}*/}
              {/*    onChange={handleChange3}/>*/}
              {/*</Col>*/}
            </FormGroup>}
            {form4 &&
            <FormGroup row>
              <Col md="6">
                <Label for="name" className="font-weight-bolder mb-0 text-info">Bank Name</Label>
                <Input type="text"  name="bankname" onChange={onChange} value={bankname}  required/>
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info"> Bank Account Name</Label>
                <Input type="text"  name="accountname" onChange={onChange} value={accountname} required />
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">Bank Account Number</Label>
                <Input type="text"  name="accountnumber" onChange={onChange} value={accountnumber} required />
              </Col>
            </FormGroup>
            }

            <div className="d-flex justify-content-md-end">
              {form2  &&
              <Button color="primary" type="button" className="mr-1" onClick={onClickBack1} >Back</Button>
              }
              {form3  &&
              <Button color="primary" type="button" className="mr-1" onClick={onClickBack2} >Back</Button>
              }
              {form4  &&
              <Button color="primary" type="button" className="mr-1" onClick={onClickBack3} >Back</Button>
              }
              {form1 &&
              <Button color="primary" type="button" className="mr-1" onClick={onClickContinue1}>Continue</Button>
              }
              {form2 &&
              <Button color="primary" type="button" className="mr-1" onClick={onClickContinue2}>Next</Button>
              }
              {form3 &&
              <Button color="primary" type="button" className="mr-1" onClick={onClickContinue3}>Next</Button>
              }
              {form4 &&
              <Button color="primary" type="submit" className="mr-1" >Submit</Button>
              }
              {/*<Button color="primary" type="submit" className="mr-1" >Submit</Button>{' '}*/}
              {/*<Button color="secondary" onClick={toggle}>Cancel</Button>*/}
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default  connect( mapStateToProps, mapDispatchToProps)(DriverModalUpdate);

