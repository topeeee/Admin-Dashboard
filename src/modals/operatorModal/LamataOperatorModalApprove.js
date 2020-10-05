import React, {useEffect, useState} from 'react';
import {Button, Col, Form, FormGroup, Label, Modal, ModalBody, ModalHeader} from 'reactstrap';
import {connect} from "react-redux";
import {
  approveOperator,
  createOperator,
  getOperators,
   toggleOperatorModalApprove,
} from "../../store/actions/operatorAction";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from "axios";
import {getStates} from "../../store/actions/stateAction";
import {ZoneUser} from "../../store/actions/zoneAction";
import {getModes} from "../../store/actions/modeAction";
import api from "../../environments/environment";
import {getService} from "../../store/actions/serviceAction";
import {BusStopUser} from "../../store/actions/busStopAction";

const animatedComponents = makeAnimated();





function mapDispatchToProps(dispatch) {
  return {
    toggleOperatorModalApprove: () => dispatch(toggleOperatorModalApprove()),
    createOperator: (pin, name,usernameMain, email, phoneNo, officeAddress, status, numberOfVehicle, contactName, contactPhoneNo, contactEmail) => dispatch(createOperator(pin, name,usernameMain, email, phoneNo, officeAddress, status, numberOfVehicle, contactName, contactPhoneNo, contactEmail)),
    // registerOperator: (username, password, name, email, phoneNo, officeAddress, status, numberOfVehicle, contactName, contactPhoneNo, contactEmail) => dispatch(registerOperator(username, password, name, email, phoneNo, officeAddress, status, numberOfVehicle, contactName, contactPhoneNo, contactEmail)),
    getStates: () => dispatch(getStates()),
    ZoneUser: () => dispatch(ZoneUser()),
    getModes: () => dispatch(getModes()),
    getOperators: () => dispatch(getOperators()),
    getService: () => dispatch(getService()),
    getStations: () => dispatch(BusStopUser()),
    approveOperator: (id) => dispatch(approveOperator(id))


  };
}

const mapStateToProps = state => ({
  operatorModalCreate: state.operator.OperatorModalCreate,
  operatorCreated: state.operator.operatorCreated,
  operatorApproveId: state.operator.operatorApproveId,
  OperatorModalApprove: state.operator.OperatorModalApprove,
  states: state.state.states,
  zones: state.zone.zones,
  modes: state.mode.modes,
  services: state.service.services,
  stations: state.busStop.busStops,

});

const OperatorModalApprove = (props) => {
  const {
    className,
    OperatorModalApprove,
    toggleOperatorModalApprove,
    zones,
    states,
    getStates,
    ZoneUser,
    getModes,
    modes,
    getOperators,
    services,
    getService,
    getStations,
    stations,
    approveOperator,
    operatorApproveId
  } = props;

  const [formData, setFormData] = useState({name: "", email: "", phoneNo: "", officeAddress: "", status: "", numberOfVehicle: "", contactName: "", contactPhoneNo: "", contactEmail: "", pin: ""});
  const [selected, setSelected] = useState([]);
  const [selected1, setSelected1] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const [selected3, setSelected3] = useState([]);
  const [zoneSelected, setZoneSelected] = useState([]);
  const [stateSelected, setStateSelected] = useState([]);
  const [modeSelected, setModeSelected] = useState([]);
  const [serviceSelected, setServiceSelected] = useState([]);
  const [stationSelected, setStationSelected] = useState([]);
  const [operatorCreated, setOperatorCreated] = useState({});


  // const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  // const { name, email, phoneNo, officeAddress, status, numberOfVehicle, contactName, contactPhoneNo, contactEmail, pin } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
     approveOperator(operatorApproveId);
    await setOperatorZones();
    await setOperatorModes();
    await setOperatorService();
    await setOperatorStations();
    // getOperators();
  };

  const getOperator = async (id) => {
    try {
      const res = await axios.get(`${api.operator}/api/operators/${id}/`);
     setOperatorCreated(res.data)
    }catch (e) {

    }

  };

  const setOperatorZones = async () => {
    try {
    await  selected1.forEach((res)=> {
        const body = {zoneCode: res.value, operatorId: operatorCreated.id, operatorName: operatorCreated.id};
        axios.post(`${api.operatorZone}/api/me/operatorzones/`, body)
      })
    }catch (e) {

    }

  };

  const setOperatorService = async () => {
    try {
    await  selected.forEach((res)=> {
        const body = {servicecode: res.value, operator_name: operatorCreated.id};
        axios.post(`${api.operatorService}/api/me/operatorservices/`, body)
      })
    }catch (e) {

    }
  };

  const setOperatorModes = async () => {
    try {
      await selected2.forEach((res)=> {
        const body = {modecode: res.value,  operator_name: operatorCreated.id};
        axios.post(`${api.operatorMode}/api/me/operatormodes/`, body)
      })
    }catch (e) {

    }
  };

  const setOperatorStations = async () => {
    try {
      await selected3.forEach((res)=> {
        const body = {stationcode: res.value,  operator_name: operatorCreated.id};
        axios.post(`${api.operatorStation}/api/me/operatorstations/`, body)
      })
    }catch (e) {

    }
  };

 const handleChange = (selected) => {
     setSelected(selected);
 };

  const handleChange2 = (selected1) => {
    setSelected1(selected1);
  };

  const handleChange3 = (selected2) => {
    setSelected2(selected2);
  };

  const handleChange4 = (selected3) => {
    setSelected3(selected3);
  };

  const toggle = () => {toggleOperatorModalApprove()};

  useEffect(()=> {
    getStates();
    ZoneUser();
    getModes();
    getService();
    getStations();
  },[]);

  useEffect(()=> {
    if(operatorApproveId) {
      getOperator(operatorApproveId)
    }
  },[operatorApproveId])


  useEffect(()=> {
    if (zones) {
      const body = [];
      zones.forEach((res)=> {
        body.push({ value: res.id, label: res.zone });
        setZoneSelected(body);
      })
    }
  }, [zones]);



  useEffect(()=> {
    if (modes) {
      const body = [];
      modes.forEach((res)=> {
        body.push({ value: res.id, label: res.mode });
        setModeSelected(body);
      })
    }
  }, [modes]);

  useEffect(()=> {
    if (services) {
      const body = [];
      services.forEach((res)=> {
        body.push({ value: res.id, label: res.service });
        setServiceSelected(body);
      })
    }
  }, [services]);

  useEffect(()=> {
    if (stations) {
      const body = [];
      stations.filter(station => station.service !== 'First mile - Last mile').forEach((res)=> {
        body.push({ value: res.id, label: res.station });
        setStationSelected(body);
      })
    }
  }, [stations]);

  return (
    <div>
      <Modal isOpen={OperatorModalApprove} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} className="text-center">Create Operator</ModalHeader>
        {/*<button onClick={forMe}>button</button>*/}
        <ModalBody>
            <Form onSubmit={onSubmit}>
            <FormGroup>
              <Col md="12">
                <Label for="name" className="font-weight-bold mb-0 text-info">Service(s)</Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={serviceSelected}
                  value={selected}
                  onChange={handleChange}/>
              </Col>
              <Col md="12">
                <Label for="name" className="font-weight-bold mb-0 text-info">Mode(s)</Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={modeSelected}
                  value={selected2}
                  onChange={handleChange3}/>
              </Col>
              <Col md="12">
                <Label for="name" className="font-weight-bold mb-0 text-info">Zone</Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  value={selected1}
                  options={zoneSelected}
                  onChange={handleChange2}
                  required
                />

              </Col>
              <Col md="12">
                <Label for="name" className="font-weight-bold mb-0 text-info">Station</Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  value={selected3}
                  options={stationSelected}
                  onChange={handleChange4}
                  required
                />

              </Col>
            </FormGroup>
              <div className="d-flex justify-content-md-end">
                <Button color="success" type="submit" className="mr-1">Approve</Button>
              </div>
            </Form>

        </ModalBody>
      </Modal>
    </div>
  );
};

export default  connect( mapStateToProps, mapDispatchToProps)(OperatorModalApprove);

