import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import { connect } from "react-redux";
import {toggleBusAssistantsModalCreate, createBusAssistants} from "../../store/actions/busAssistantAction";
import {ZoneUser} from "../../store/actions/zoneAction";
import {RouteUser} from "../../store/actions/routeAction";
import makeAnimated from "react-select/animated/dist/react-select.esm";
import  axios from "axios";
import {getOperators} from "../../store/actions/operatorAction";
import {getVehicles} from "../../store/actions/vehicleAction";
import {getAreas} from "../../store/actions/areaAction";
import api from '../../environments/environment'
import {getModes} from "../../store/actions/modeAction";
import Select from "react-select";
import {BusStopUser} from "../../store/actions/busStopAction";
import {isOperator, OperatorId, OperatorName} from "../../environments/constants";

const animatedComponents = makeAnimated();






function mapDispatchToProps(dispatch) {
  return {
    toggleBusAssistantsModalCreate: () => dispatch(toggleBusAssistantsModalCreate()),
    createBusAssistants: (operatorId, firstName, lastName, pin, residentialAddress, email, status, phoneNo, bankName, accountName, accountNumber, assignedMode, geoFencedArea, stationSelected
    ) =>
      dispatch(createBusAssistants(operatorId, firstName, lastName, pin, residentialAddress, email, status, phoneNo, bankName, accountName, accountNumber, assignedMode, geoFencedArea, stationSelected
      )),
    ZoneUser: () => dispatch(ZoneUser()),
    RouteUser: () => dispatch(RouteUser()),
    getOperators: () => dispatch(getOperators()),
    getVehicles: () => dispatch(getVehicles()),
    getAreas: () => dispatch(getAreas()),
    getModes: () => dispatch(getModes()),
    getStations: () => dispatch(BusStopUser())

  };
}


const mapStateToProps = state => ({
  BusAssistantModalCreate: state.busAssistants.BusAssistantModalCreate,
  zones: state.zone.zones,
  routes: state.route.routes,
  modes: state.mode.modes,
  isAuthenticated: state.auth.isAuthenticated,
  operators: state.operator.operators,
  vehicles: state.vehicle.vehicles,
  areas: state.area.areas,
  stations: state.busStop.busStops,


});

const BusAssistantModalCreate = (props) => {
  const {
    className,
    toggleBusAssistantsModalCreate,
    BusAssistantModalCreate,
    createBusAssistants,
    isAuthenticated,
    stations,
    getStations
  } = props;






  useEffect(()=>{
   if(isAuthenticated) {
     getModes();
     getStations();
   }
  },[]);



  const [formData, setFormData] = useState({
    firstName: "", lastName: "", pin: "", residentialAddress: "", email: "", status: "", phoneNo: "", bankName: "", accountName: "", accountNumber: "", assignedMode: "", zone: "", area: "", route: "", geoFencedArea: ""

  });
  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);
  const [regPin, setRegpin] = useState('');
  const [operatorId] = useState(isOperator? OperatorId: '');
  const [selected, setSelected] = useState([]);
  const [stationSelected, setStationSelected] = useState([]);


  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onClickContinue1 = () => {
    register();
    setForm1(false);
    setForm2(true);
  };


  const onClickBack1 = () => {
    setForm1(true);
    setForm2(false);
  };


  const {
    firstName, lastName, pin, residentialAddress, email, status, phoneNo, bankName, accountName, accountNumber, assignedMode, zone, area, route, geoFencedArea
  } = formData;

 async function register() {
    try {
    const res = await  axios.post(`${api.login}/admin/users/`, {username: email, password: "password"})
      setRegpin(res.data.id)
    }catch (e) {

    }
  }

  const onSubmit = async (e) => {
     e.preventDefault();
    createBusAssistants(operatorId, firstName, lastName, regPin, residentialAddress, email, status, phoneNo, bankName, accountName, accountNumber, assignedMode, geoFencedArea, selected
    );
    setFormData({
      firstName: "", lastName: "", pin: "", residentialAddress: "", email: "", status: "", phoneNo: "", bankName: "", accountName: "", accountNumber: "", assignedMode: "", zone: "", area: "", route: "", geoFencedArea: ""

    });
    setForm1(true);
    setForm2(false);

  };

 useEffect(()=> {
    if (stations) {
      const body = [];
      stations.forEach((res)=> {
        body.push({ value: res.station, label: res.station });
        setStationSelected(body);
      })
    }
  }, [stations]);


  const handleChange = (selected) => {
    setSelected(selected);
  };

  const toggle = () => {toggleBusAssistantsModalCreate()};

  return (
    <div>
      <Modal isOpen={BusAssistantModalCreate} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} className="text-center">Create Operation Assistant</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            {form1 &&
            <FormGroup row>
              <Col md="6">
                <Label for="name" className="font-weight-bolder mb-0 text-info">First Name</Label>
                <Input type="text"  name="firstName" onChange={onChange} value={firstName}  required/>
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">Last Name</Label>
                <Input type="text"  name="lastName" onChange={onChange} value={lastName} required />
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">residential Address</Label>
                <Input type="text" name="residentialAddress" onChange={onChange} value={residentialAddress} required />
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">email</Label>
                <Input type="email" name="email" onChange={onChange} value={email} required />
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">phoneno</Label>
                <Input type="text"  name="phoneNo" onChange={onChange} value={phoneNo} required />
              </Col>
            </FormGroup>}
            {form2 &&
            <FormGroup row>
              <Col md="12">
                <Label for="name" className="font-weight-bold mb-0 text-info">Station</Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  value={selected}
                  options={stationSelected}
                  onChange={handleChange}
                  required
                />

              </Col>
            </FormGroup>}
            <div className="d-flex justify-content-md-end">
              {form2  &&
              <Button color="primary" type="button" className="mr-1" onClick={onClickBack1} >Back</Button>
              }
              {form1 &&
              <Button color="primary" type="button" className="mr-1" onClick={onClickContinue1}>Continue</Button>
              }
              {form2 &&
              <Button color="primary" type="submit" className="mr-1" >Submit</Button>
              }
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default  connect( mapStateToProps, mapDispatchToProps)(BusAssistantModalCreate);

