import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import { connect } from "react-redux";
import {toggleVehicleModalCreate, createVehicle} from "../../store/actions/vehicleAction";
import {getOperators} from "../../store/actions/operatorAction";
import {isOperator, isPartner, OperatorName, PartnerId, PartnerName} from "../../environments/constants";
import {getPartners} from "../../store/actions/partnerAction";



const isAdmin = sessionStorage.getItem('isAdmin');

function mapDispatchToProps(dispatch) {
  return {
    toggleVehicleModalCreate: () => dispatch(toggleVehicleModalCreate()),
    createVehicle: (vehicle_make, vehicle_model, vehicle_type, plate_number, capacity, operator, partner_id) =>
      dispatch(createVehicle(vehicle_make, vehicle_model, vehicle_type, plate_number, capacity, operator, partner_id)),
    getOperators: () => dispatch(getOperators()),
    getPartners: () => dispatch(getPartners()),

  };
}

const mapStateToProps = state => ({
  vehicleModalCreate: state.vehicle.VehicleModalCreate,
  operators: state.operator.operators,
  isAuthenticated: state.auth.isAuthenticated,
  partners: state.partners.partners,




});

const VehicleModalCreate = (props) => {

  const {
    className,
    toggleVehicleModalCreate,
    vehicleModalCreate,
    createVehicle,
    operators,
    getOperators,
    isAuthenticated,
    partners,
    getPartners
  } = props;




  useEffect(()=> {
    if(isAuthenticated){
      getOperators();
      getPartners();
    }
  }, []);


  const [formData, setFormData] = useState({vehicle_make: "", vehicle_model: "", vehicle_type: "", plate_number: "", capacity: "", operator: "", partner_id: ''});

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const {
    vehicle_make, vehicle_model, vehicle_type, plate_number, capacity, operator, partner_id
  } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    createVehicle(vehicle_make, vehicle_model, vehicle_type, plate_number, capacity, operator, partner_id);
    setFormData( {...formData, vehicle_make: "", vehicle_model: "", vehicle_type: "", plate_number: "", capacity: "", operator: "", partner_id: "" })

  };

  useEffect(()=> {
   if(isOperator) {
     setFormData({...formData, operator: OperatorName })
   }
   }, [isOperator]);

  useEffect(()=> {
    if(isPartner) {
      setFormData({...formData, partner_id: PartnerId })
    }
  }, []);

  const toggle = () => {toggleVehicleModalCreate()};


  return (
    <div>
      <Modal isOpen={vehicleModalCreate} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} className="text-center">Create Vehicle</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup row>

              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">Vehicle Make</Label>
                <Input type="text"  name="vehicle_make" onChange={onChange} value={vehicle_make} required/>
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info"> Vehicle Model</Label>
                <Input type="text"  name="vehicle_model" onChange={onChange} value={vehicle_model} required />
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">Mode</Label>
                <Input
                  style={{cursor: 'pointer'}}
                  type="select"
                  name="vehicle_type"
                  value={vehicle_type}
                  onChange={onChange}
                  required
                >
                  <option value="">Select Mode</option>
                  <option value="Mini Bus">Mini Bus</option>
                  <option value="Large Bus">Large Bus</option>
                  <option value="Car">Car</option>
                  <option value="Train">Train</option>
                  <option value="Ferry">Ferry</option>
                  <option value="Bike">Bike</option>

                </Input>
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">Vehicle  Plate Number</Label>
                <Input type="text"  name="plate_number" onChange={onChange} value={plate_number} required />
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">capacity</Label>
                <Input type="text"  name="capacity" onChange={onChange} value={capacity} required />
              </Col>
              <Col md="6">
                <Label for="name" className="font-weight-bold mb-0 text-info">Operator</Label>
                {(operators && (isAdmin || isPartner)) &&<Input
                  style={{cursor: 'pointer'}}
                  type="select"
                  name="operator"
                  value={operator}
                  onChange={onChange}
                  required
                >
                  <option value="">Select Operator</option>
                  {isPartner?  <option value="All">All</option>: null}
                  {(operators && (isAdmin || isPartner)) && operators.map((operator, index) =>
                    <option value={operator.name} key={index}>{operator.name}</option>
                  )}
                  {/*{(operators && isAdmin !== admin) && operators.filter(user =>(user.email === isAdmin)).map((operator, index) =>*/}
                  {/*  <option value={operator.name} key={index}>{operator.name}</option>*/}
                  {/*)}*/}


                </Input>}
                {(operators && isOperator) && <Input type="text"  name="operator" readOnly={true} onChange={onChange} value={operator} required />}
              </Col>
              <Col md="6">
                {isAdmin || isOperator ?  <Label for="name" className="font-weight-bold mb-0 text-info">Partner</Label>: null}
                {(partners && isOperator || isAdmin) &&<Input
                  style={{cursor: 'pointer'}}
                  type="select"
                  name="partner_id"
                  value={partner_id}
                  onChange={onChange}
                >
                  <option value="">Select Partner</option>
                  {partners && partners.map((partner, index) =>
                    <option value={partner.id} key={index}>{partner.name}</option>
                  )}
                </Input>}
              </Col>
            </FormGroup>
            <div className="d-flex justify-content-md-end">
              <Button color="primary" type="submit" className="mr-1" >Submit</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default  connect( mapStateToProps, mapDispatchToProps)(VehicleModalCreate);

