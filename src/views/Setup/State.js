import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import axios from "axios"
import {Card, CardBody, CardHeader, Col, Row, Table, Input} from 'reactstrap';
import StateHeader from "./components/StateHeader";
import {getStates, searchState} from "../../store/actions/stateAction";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelopeSquare, faFilePdf, faPrint} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../spinner/Spinner";
import {isAdmin, isOperator, OperatorName} from "../../environments/constants";
import {ZoneUser} from "../../store/actions/zoneAction";
import api from "../../environments/environment";




function UserRow(props) {
  const user = props.user;


  return (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.countrycode}</td>
      <td>{user.xstate}</td>
      {/*<td> <StateActionBtn id={user.id} /> </td>*/}
    </tr>
  )
}

const States = ({getStates, states, state, isLoading,  searchState, error, zones, ZoneUser}) => {
  const [formData, setFormData] = useState('');
  const [operatorZone, setOperatorZone] = useState('');
  const [isState, setIsState] = useState('');

 async function getOperatorZone() {
    try {
      const res = await axios.get(`${api.operatorZone}/api/all/operatorzones/`);
      res.data.map(operatorZone => {
            if(operatorZone.operatorName === OperatorName) {
              setOperatorZone(operatorZone.zoneCode)
            }
          })
    }catch (e) {

    }
  }

  useEffect(()=> {
    if(zones && operatorZone) {
      zones.map(zone=> {
        if(zone.zone === operatorZone) {
          setIsState(zone.statecode)
        }
      })
    }
  },[zones, operatorZone]);

  useEffect(()=>{
    if(formData === ''){
      getStates()
    }
    },[formData]);

  useEffect(()=> {
    ZoneUser();
    getOperatorZone();
  },[]);

  const onChange = (e) =>{
    e.preventDefault();
    setFormData(e.target.value );
  };

  const onSearch = e => {
    e.preventDefault();
    searchState(formData)
  };


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
              <CardHeader className="d-flex align-items-center">
                <div className="w-25">
                  States
                </div>
                {isAdmin &&  <StateHeader />}
              </CardHeader>
              {isLoading && <Spinner />}
              {!isLoading &&
              <CardBody>
                {error && <div className="animated fadeIn pt-1 text-center text-danger mb-2 font-italic">{error}</div>}
                {(states && states.length === 0) &&
                <div className="animated fadeIn pt-1 text-center">No States Available</div> }
                {((states && states.length > 0) || state ) &&
                <Table responsive hover>
                  <thead className="bg-dark">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Country</th>
                    <th scope="col">State</th>
                    {/*<th scope="col">State Code</th>*/}
                    {/*<th scope="col">Action</th>*/}
                  </tr>
                  </thead>
                  <tbody>
                  {(states && isAdmin) ? states.sort((a, b) => parseFloat(b.id) - parseFloat(a.id)).map((user, index) =>
                    <UserRow key={index} user={user}/>
                  ): null}
                  {(states && isState && isOperator) ? states.sort((a, b) => parseFloat(b.id) - parseFloat(a.id)).filter((user) => user.xstate === isState).map((user, index) =>
                    <UserRow key={index} user={user}/>
                  ): null}
                  {state &&
                    <UserRow user={state}/>
                  }
                  </tbody>
                </Table>}
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
    getStates: () => dispatch(getStates()),
    searchState: (id) => dispatch(searchState(id)),
    ZoneUser: () => dispatch(ZoneUser()),
  };
}

const mapStateToProps = state => ({
  states: state.state.states,
  state: state.state.state,
  error: state.state.error,
  isLoading: state.state.isLoading,
  zones: state.zone.zones,

});

export default connect(mapStateToProps,mapDispatchToProps)(States);
