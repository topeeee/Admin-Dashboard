import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import { connect } from "react-redux";
import {toggleDriverModalCreate, createDriver} from "../../store/actions/driverAction";
import {ZoneUser} from "../../store/actions/zoneAction";
import {RouteUser} from "../../store/actions/routeAction";
import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.esm";
import  axios from "axios";
import {getOperators} from "../../store/actions/operatorAction";
import {getVehicles} from "../../store/actions/vehicleAction";
import {getAreas} from "../../store/actions/areaAction";
import api from '../../environments/environment'
import {isOperator, OperatorName, isAdmin} from "../../environments/constants";
const animatedComponents = makeAnimated();







function mapDispatchToProps(dispatch) {
  return {
    toggleDriverModalCreate: () => dispatch(toggleDriverModalCreate()),
    createDriver: (vehicleId, operatorInput, operatorId, firstname, lastname, residentialaddress, email, phoneno, status, pin, bankname, accountname, accountnumber, zone, area, route, geofencedarea, appstatus) =>
      dispatch(createDriver(vehicleId, operatorInput, operatorId, firstname, lastname, residentialaddress, email, phoneno, status, pin, bankname, accountname, accountnumber, zone, area, route, geofencedarea, appstatus)),
    ZoneUser: () => dispatch(ZoneUser()),
    RouteUser: () => dispatch(RouteUser()),
    getOperators: () => dispatch(getOperators()),
    getVehicles: () => dispatch(getVehicles()),
    getAreas: () => dispatch(getAreas()),


  };
}


const mapStateToProps = state => ({
  driverModalCreate: state.driver.DriverModalCreate,
  zones: state.zone.zones,
  routes: state.route.routes,
  isAuthenticated: state.auth.isAuthenticated,
  operators: state.operator.operators,
  vehicles: state.vehicle.vehicles,
  areas: state.area.areas,


});

const DriverModalCreate = (props) => {
  const {
    className,
    toggleDriverModalCreate,
    driverModalCreate,
    createDriver,
    zones,
    routes,
    ZoneUser,
    RouteUser,
    isAuthenticated,
    operators,
    getOperators,
    vehicles,
    getVehicles,
    getAreas,
    areas
  } = props;
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
  const [vehicleId, setVehicleId] = useState('');
  const [operatorZone, setOperatorZone] = useState([]);
  const [operatorMode, setOperatorMode] = useState([]);
  const [operatorId, setOperatorId] = useState('');
  // const [zoneA, setZoneA] = useState('');


  async function getOperatorZone() {
    try {
    const res =  await axios.get(`${api.operatorZone}/api/all/operatorzones/`);
      setOperatorZone(res.data);
    }catch (e) {

    }
  }



  async function getOperatorMode() {
   try {
   const res =  await axios.get(`${api.operatorMode}/api/me/operatormodes/`);
     setOperatorMode(res.data);
   }catch (e) {

   }
  }


  useEffect(()=>{
    if(isAuthenticated) {
      getOperatorZone();
      getOperatorMode();
    }
  },[]);



  const [formData, setFormData] = useState({
    firstname: "", lastname: "", residentialaddress: "", email: "", phoneno: "", status: "", pin: "", bankname: "", accountname: "", accountnumber: "", zone: "", area: "", route: "", geofencedarea: "", appstatus: ""
  });



  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });





  const onClickContinue1 = () => {
    register();
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


  const {
    firstname, lastname, residentialaddress, email, phoneno, status, pin, bankname, accountname, accountnumber, zone, area, route, geofencedarea, appstatus
  } = formData;

  async function register() {
   try {
  const res = await axios.post(`${api.login}/admin/users/`, {username: email, password: "password"})
     setRegpin(res.data.id)
   }catch (e) {

   }
  }

 async function assignVehicle(id, status) {
   try {
    await axios.put(`${api.vehicle}/api/assign/driver/${id}/?assign=${status}`)
   }catch (e) {

   }
  }


  const handleChange3 = (selected2) => {
    setSelected2(selected2);
  };


  const onSubmit = async (e) => {
     e.preventDefault();
    createDriver(vehicleId, operatorInput, operatorInput, firstname, lastname, residentialaddress, email, phoneno, status, regPin, bankname, accountname, accountnumber, zoneInput, areaInput, routeInput, geofencedarea, appstatus);
    assignVehicle(vehicleId, "1");
    setFormData({
      firstname: "", lastname: "", residentialaddress: "", email: "", phoneno: "", status: "0", pin: "", bankname: "", accountname: "", accountnumber: "", zone: "", area: "", route: "", geofencedarea: "", appstatus: ""
    });
    setForm1(true);
    setForm3(false);
    setForm2(false);
    setForm4(false);

  };

  var zoneA = '';
  const setZone = (id)=> {
    if(zones && id) {
      zones.map(zone=> {
        if(zone.id == id) {
         zoneA = zone.zone
        }
      })
    }
    return zoneA
  }




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


  useEffect(()=> {
    if(vehicles && plateInput) {
      vehicles.map(vehicle => {
        if(vehicle.plate_number === plateInput) {
          setVehicleId(vehicle.id);
        }
      })
    }
  }, [plateInput]);

  useEffect(()=> {
    if(isOperator) {
      setOperatorInput(OperatorName)
    }
  }, [isOperator]);

  useEffect(()=>{
    if(isAuthenticated) {
      RouteUser();
      ZoneUser();
      getOperators();
      getVehicles();
      getAreas()
    }
  }, [operatorInput]);

  useEffect(()=> {
    if(operators && operatorInput) {
      operators.map(operator=> {
        if(operator.name === operatorInput) {
          setOperatorId(operator.id)
        }
      })
    }
  },[operators, operatorInput]);


  const toggle = () => {toggleDriverModalCreate()};


  return (
    <div>
      <Modal isOpen={driverModalCreate} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} className="text-center">Create Driver</ModalHeader>
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
                {(isAdmin) && <Input
                  style={{cursor: 'pointer'}}
                  type="select"
                  name="operatorInput"
                  value={operatorInput}
                  onChange={e=>setOperatorInput(e.target.value)}
                  // required
                >
                  <option value="">Select Operator</option>

                  {operators && operators.map((operator, index) =>
                    <option value={operator.id} key={index}>{operator.name}</option>
                  )}
                </Input>}
                {(operators && isOperator) &&
                <Input type="text"  name="operatorInput" onChange={onChange} value={operatorInput} readOnly={true} required />}
              </Col>
              <Col md="12">
                <Label for="name" className="font-weight-bold mb-0 text-info">Vehicle Mode</Label>
                <Input
                  style={{cursor: 'pointer'}}
                  type="select"
                  name="vehicleInput"
                  value={vehicleInput}
                  onChange={e=>setVehicleInput(e.target.value)}
                  // required
                >
                  <option value="">Select Vehicle Mode</option>
                  {(vehicles && operatorInput) && vehicles.filter((user) => user.operator == operatorInput).map((vehicle, index) =>
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
                  <option value="">Select Vehicle Plate no</option>
                  {(vehicles && vehicleInput) && vehicles.filter((user) => (user.mode === vehicleInput) && (user.operator === operatorInput) && (user.assigned_driver === null || user.assigned_driver === "null") && (user.status === "1")).map((vehicle, index) =>
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
                  {(operatorZone && operatorInput) && operatorZone.filter((user) => user.operatorName == operatorInput).map((zone, index) =>
                    <option value={zone.zoneCode} key={index}>{setZone(zone.zoneCode)}</option>
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
                  {(areas && zoneInput) && areas.filter((user) => user.zonecode === zoneA).map((area, index) =>
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

export default  connect( mapStateToProps, mapDispatchToProps)(DriverModalCreate);

