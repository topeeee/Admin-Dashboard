import React, {useEffect, useState} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from 'reactstrap';
import {connect} from "react-redux";
import {getOperators, toggleOperatorModalUpdate, updateOperator} from "../../store/actions/operatorAction";
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
    toggleOperatorModalUpdate: () => dispatch(toggleOperatorModalUpdate()),
    getStates: () => dispatch(getStates()),
    ZoneUser: () => dispatch(ZoneUser()),
    getModes: () => dispatch(getModes()),
    getOperators: () => dispatch(getOperators()),
    updateOperator: (id, name, email, phoneNo, officeAddress,  numberOfVehicle, contactName, contactPhoneNo, contactEmail) => dispatch(updateOperator(id, name, email, phoneNo, officeAddress, numberOfVehicle, contactName, contactPhoneNo, contactEmail)),
    getService: () => dispatch(getService()),
    getStations: () => dispatch(BusStopUser())

  };
}

const mapStateToProps = state => ({
  operatorModalUpdate: state.operator.OperatorModalUpdate,
  operatorCreated: state.operator.operatorCreated,
  states: state.state.states,
  zones: state.zone.zones,
  modes: state.mode.modes,
  operatorUpdateId: state.operator.operatorUpdateId,
  operators: state.operator.operators,
  isAuthenticated: state.auth.isAuthenticated,
  services: state.service.services,
  stations: state.busStop.busStops,

});

const OperatorModalUpdate = (props) => {
  const {
    className,
    operatorModalUpdate,
    toggleOperatorModalUpdate,
    zones,
    states,
    getStates,
    ZoneUser,
    getModes,
    modes,
    getOperators,
    operatorUpdateId,
    operators,
    updateOperator,
    isAuthenticated,
    services,
    getService,
    getStations,
    stations

  } = props;

  const [formData, setFormData] = useState({name: "", email: "", phoneNo: "", officeAddress: "", status: "1", numberOfVehicle: "", contactName: "", contactPhoneNo: "", contactEmail: ""});
  const [selected, setSelected] = useState([]);
  const [selected1, setSelected1] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const [selected3, setSelected3] = useState([]);
  const [selected4, setSelected4] = useState([]);
  const [zoneSelected, setZoneSelected] = useState([]);
  const [stateSelected, setStateSelected] = useState([]);
  const [modeSelected, setModeSelected] = useState([]);
  const [serviceSelected, setServiceSelected] = useState([]);
  const [stationSelected, setStationSelected] = useState([]);
  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);
  const [newOperator, setNewOperator] = useState([]);
  const [operatorName, setOperatorName] = useState('');
  const [operatorVehicle, setOperatorVehicle] = useState([]);
  const [operatorZone, setOperatorZone] = useState([]);
  const [operatorMode, setOperatorMode] = useState([]);
  const [operatorService, setOperatorService] = useState([]);
  const [operatorStation, setOperatorStation] = useState([]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const { name, email, phoneNo, officeAddress, numberOfVehicle, contactName, contactPhoneNo, contactEmail } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    updateOperator(operatorUpdateId, name, email, phoneNo, officeAddress,  numberOfVehicle, contactName, contactPhoneNo, contactEmail);
    // await setOperatorVehicleTypes();
    await setOperatorZones();
    await setOperatorModes();
    await setOperatorServices();
    await setOperatorStations();
    getOperators();
    setForm2(false)
    setForm1(true)
  };


  const setOperatorZones = async () => {
    try {
    await  selected1.forEach((res)=> {
        const body = {zoneCode: res.value, operatorId: operatorUpdateId, operatorName: operatorName};
        axios.post(`${api.operatorZone}/api/me/operatorzones/`, body)
      });
    await  operatorZone.forEach((res)=> {
        axios.delete(`${api.operatorZone}/admin/operatorzones/${res.id}/`)
      })
    }catch (e) {

    }
  };

  // const setOperatorVehicleTypes = async () => {
  //   try {
  //    await selected.forEach((res)=> {
  //       const body = {vehicleType: res.value, operatorId: operatorUpdateId, operatorName: operatorName};
  //       axios.post(`${api.operatorVehicleTypes}/api/me/operatorvehicletypes/`, body)
  //    });
  //   await  operatorVehicle.forEach((res)=> {
  //       axios.delete(`${api.operatorVehicleTypes}/admin/operatorvehicletypes/${res.id}/`)
  //   })
  //   }catch (e) {
  //
  //   }
  // };

  const setOperatorModes = async () => {
    try {
     await selected2.forEach((res)=> {
        const body = {modecode: res.value,  operator_name: operatorName};
        axios.post(`${api.operatorMode}/api/me/operatormodes/`, body)
      });
    await  operatorMode.forEach((res)=> {
        axios.delete(`${api.operatorMode}/admin/operatormodes/${res.id}/`)
    })
    }catch (e) {

    }
  };

  const setOperatorServices = async () => {
    try {
      await selected3.forEach((res)=> {
        const body = {servicecode: res.value,  operator_name: operatorName};
        axios.post(`${api.operatorService}/api/me/operatorservices/`, body)
      });
      await  operatorService.forEach((res)=> {
        axios.delete(`${api.operatorService}/admin/operatorservices/${res.id}/`)
      })
    }catch (e) {

    }
  };

  const setOperatorStations = async () => {
    try {
      await selected4.forEach((res)=> {
        const body = {stationcode: res.value,  operator_name: operatorName};
        axios.post(`${api.operatorStation}/api/me/operatorstations/`, body)
      });
      await  operatorStation.forEach((res)=> {
        axios.delete(`${api.operatorStation}/admin/operatorstations/${res.id}/`)
      })
    }catch (e) {

    }
  };

  function getNewOperator() {
      if(newOperator){
        newOperator.map(operator => {
          if(operator.id === operatorUpdateId) {
            setOperatorName(operator.id);
            setFormData({name: operator.name, email: operator.email, phoneNo: operator.phoneNo, officeAddress: operator.officeAddress,  numberOfVehicle: operator.numberOfVehicle, contactName: operator.contactName, contactPhoneNo: operator.contactPhoneNo, contactEmail: operator.contactEmail})
          }
        });
      }
  }

  // async function getOperatorVehicle(id) {
  //   try {
  //    const res =  await axios.get(`${api.operatorVehicleTypes}/api/operators/?operatorId=${id}`);
  //     setOperatorVehicle(res.data);
  //   }catch (e) {
  //
  //   }
  // }

    async function getOperatorMode(operatorname) {
    try {
     const res = await axios.get(`${api.operatorMode}/api/mode/?operator_name=${operatorname}`);
      setOperatorMode(res.data);
    }catch (e) {

    }
  }

  async function getOperatorZone(id) {
    try {
    const res = await  axios.get(`${api.operatorZone}/api/operators/?operatorId=${id}`);
          setOperatorZone(res.data);
    }catch (e) {

    }
  }

  async function getOperatorService(operatorname) {
    try {
      const res = await axios.get(`${api.operatorService}/api/mode/?operator_name=${operatorname}`)

      setOperatorService(res.data);
    }catch (e) {

    }
  }

  async function getOperatorStation(operatorname) {
    try {
      const res = await axios.get(`${api.operatorStation}/api/station/?operator_name=${operatorname}`)
      setOperatorStation(res.data);
    }catch (e) {

    }
  }

  const handleChange = (value) => {
    setSelected3(value);
  };

  const handleChange1 = (value) => {
    setSelected1(value);
  };

  const handleChange2 = (value) => {
    setSelected2(value);
  };

  const handleChange3 = (value) => {
    setSelected4(value);
  };

  const toggle = () => {toggleOperatorModalUpdate()};

  const onClickContinue1 = async (e) => {
    e.preventDefault();
    setForm1(false);
    setForm2(true);
  };

  const onClickBack1 = () => {
    setForm1(true);
    setForm2(false);
  };

  useEffect(()=> {
  if(operatorUpdateId && operatorName) {
    // getOperatorVehicle(operatorUpdateId);
    getOperatorMode(operatorName);
    getOperatorZone(operatorUpdateId);
    getOperatorService(operatorName);
    getOperatorStation(operatorName);
  }
},[operatorUpdateId, operatorName]);

  // useEffect(()=> {
  //   if (operatorVehicle) {
  //     const body = [];
  //     operatorVehicle.forEach((res)=> {
  //       body.push({ value: res.vehicleType, label: res.vehicleType });
  //       setSelected(body);
  //     })
  //   }
  // }, [operatorVehicle]);

  // useEffect(()=> {
  //   if (selected) {
  //
  //   }
  // }, [selected]);

  useEffect(()=> {
    if (operatorZone &&zones) {
      const body = [];
      operatorZone.forEach((res)=> {
        zones.map(zone=> {
          if(res.zoneCode == zone.id) {
            body.push({ value: zone.id, label: zone.zone });
          }
        })

        setSelected1(body);
      })
    }
  }, [operatorZone, zones]);

  useEffect(()=> {
    if (operatorMode && modes) {
      const body = [];
      operatorMode.forEach((res)=> {
        modes.map(mode=> {
          if(res.modecode == mode.id) {
            body.push({ value: mode.id, label: mode.mode });
          }
        })

        setSelected2(body);
      })
    }
  }, [operatorMode, modes]);

  useEffect(()=> {
    if (operatorService && services) {
      const body = [];
      operatorService.forEach((res)=> {
        services.map(service=> {
          if(res.servicecode == service.id) {
            body.push({ value: service.id, label: service.service });
          }
        })

        setSelected3(body);
      })
    }
  }, [operatorService, services]);

  useEffect(()=> {
    if (operatorStation && stations) {
      const body = [];
      operatorStation.forEach((res)=> {
        stations.map(station=> {
          if(res.stationcode == station.id) {
            body.push({ value: station.id, label: station.station });
          }
        })

        setSelected4(body);
      })
    }
  }, [operatorStation, stations]);


  useEffect(()=> {
    // setId(operatorUpdateId);
    setNewOperator(operators);
    },[operatorUpdateId]);

  useEffect(()=> {
    getNewOperator();
  }, [newOperator, operatorUpdateId]);

  useEffect(()=> {
    if(isAuthenticated) {
      // getStates();
      ZoneUser();
      getModes();
      getService();
      getStations();
    }
  },[]);

  useEffect(()=> {
    if (zones) {
      const body = [];
      zones.forEach((res)=> {
        body.push({ value: res.id, label: res.zone });
        setZoneSelected(body);
      })
    }
  }, [zones]);


  // useEffect(()=> {
  //   if (states) {
  //     const body = [];
  //     states.forEach((res)=> {
  //       body.push({ value: res.xstate, label: res.xstate });
  //       setStateSelected(body);
  //       setSelected3(body)
  //     })
  //   }
  // }, [states]);

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


  // const options = [
  //   { value: 'Train', label: 'Train' },
  //   { value: 'Ferry', label: 'Ferry' },
  //   { value: 'Large Bus', label: 'Large Bus' },
  //   { value: 'Mini Bus', label: 'Mini Bus' },
  //   { value: 'Car', label: 'Mini Car' }
  // ];

  return (
    <div>
      <Modal isOpen={operatorModalUpdate} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} className="text-center">Update Operator</ModalHeader>
        {/*<button onClick={forMe}>button</button>*/}
        <ModalBody>

          {form1 &&
          <Form onSubmit={onClickContinue1}>
            <FormGroup row>
              <Col md="6">
                <Label for="name" className="font-weight-bolder mb-0 text-info">Company Name</Label>
                <Input type="text"  name="name" onChange={onChange}  value={name}  required/>
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">Company Phone</Label>
                <Input type="text"  name="phoneNo" onChange={onChange} value={phoneNo}  required />
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">Company Email</Label>
                <Input type="email"  name="email" onChange={onChange}  value={email} required/>
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">Office Address</Label>
                <Input type="text"  name="officeAddress" onChange={onChange}  value={officeAddress} required />
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">Contact Person Name</Label>
                <Input type="text"  name="contactName" onChange={onChange} value={contactName} required />
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">Contact Person Phone</Label>
                <Input type="text"  name="contactPhoneNo" onChange={onChange} value={contactPhoneNo} required />
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">Contact Person Email</Label>
                <Input type="text"  name="contactEmail" onChange={onChange} value={contactEmail} required />
              </Col>
            </FormGroup>
            <div className="d-flex justify-content-md-end">
              {form1 &&

              <Button color="primary" type="type" className="mr-1 float-right">Continue</Button>
              }
            </div>
          </Form>}
          {form2 &&
          <Form onSubmit={onSubmit}>
            <FormGroup>
              {/*<Col md="12">*/}
              {/*  <Label for="name" className="font-weight-bold mb-0 text-info">Vehicle Modes</Label>*/}
              {/*  <Select*/}
              {/*    closeMenuOnSelect={false}*/}
              {/*    components={animatedComponents}*/}
              {/*    isMulti*/}
              {/*    options={options}*/}
              {/*    value={selected}*/}
              {/*    onChange={handleChange}*/}
              {/*    required*/}
              {/*  />*/}

              {/*</Col>*/}
              {/*<Col md="12">*/}
              {/*  <Label for="name" className="font-weight-bold mb-0 text-info">State</Label>*/}
              {/*  <Select*/}
              {/*    closeMenuOnSelect={false}*/}
              {/*    components={animatedComponents}*/}
              {/*    isMulti*/}
              {/*    options={stateSelected}*/}
              {/*    value={selected3}*/}


              {/*  />*/}

              {/*</Col>*/}
              <Col md="12">
                <Label for="name" className="font-weight-bold mb-0 text-info">Service(s)</Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={serviceSelected}
                  value={selected3}
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
                  onChange={handleChange2}/>
              </Col>
              <Col md="12">
                <Label for="name" className="font-weight-bold mb-0 text-info">Zone(s)</Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  value={selected1}
                  options={zoneSelected}
                  onChange={handleChange1}
                  required
                />

              </Col>

              <Col md="12">
                <Label for="name" className="font-weight-bold mb-0 text-info">Station(s)</Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  value={selected4}
                  options={stationSelected}
                  onChange={handleChange3}
                  required
                />

              </Col>
              {/*<Col md="12">*/}
              {/*  <Label for="name" className="font-weight-bold mb-0 text-info">Geo-fenced area</Label>*/}
              {/*  <Select*/}
              {/*    closeMenuOnSelect={false}*/}
              {/*    components={animatedComponents}*/}
              {/*    isMulti*/}
              {/*    options={options} />*/}
              {/*</Col>*/}
            </FormGroup>
            <div className="d-flex justify-content-md-end">
              {form2  &&
              <Button color="primary" type="button" className="mr-1" onClick={onClickBack1}>Back</Button>
              }
              {form2 &&
              <Button color="primary" type="submit" className="mr-1">Submit</Button>
              }
            </div>
          </Form>}
          <div className="d-flex justify-content-md-end">

            {/*<Button color="primary" type="submit" className="mr-1" >Submit</Button>{' '}*/}
            {/*<Button color="secondary" onClick={toggle}>Cancel</Button>*/}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default  connect( mapStateToProps, mapDispatchToProps)( OperatorModalUpdate);

