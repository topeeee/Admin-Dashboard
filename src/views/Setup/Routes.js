import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import axios from "axios";
import {Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import PrimaryHeader from "../components/PrimaryHeader";
import {RouteUser} from "../../store/actions/routeAction";
import RouteHeader from "./components/RouteHeader";
import {getAreas} from "../../store/actions/areaAction";
import Spinner from "../../spinner/Spinner";
import {isAdmin, isLamata, isOperator, OperatorId, OperatorName} from "../../environments/constants";
import RouteActionBtn from "./components/RouteActionBtn";
import api from "../../environments/environment";
import {ZoneUser} from "../../store/actions/zoneAction";



function UserRow(props) {
  const user = props.user;

  return (
    <tr key={user.id}>
      <td>{user.route}</td>
      <td>{user.routecode}</td>
      <td>₦{user.price}</td>
      <td>{user.areacode}</td>
      {isAdmin?  <td> <RouteActionBtn id={user.id} /> </td>:null}
    </tr>
  )
}

const Routes = ({RouteUser, routes, isLoading, areas, getAreas, zones, ZoneUser}) => {
  const [operatorZone, setOperatorZone] = useState('');
  const [area, setArea] = useState('');

  async function getOperatorZone() {
    try {
      const res = await  axios.get(`${api.operatorZone}/api/all/operatorzones/`);
      res.data.map(operatorZone => {
        if(operatorZone.operatorName == OperatorId) {
          zones.map(zone=> {
            if(zone.id == operatorZone.zoneCode) {
              setOperatorZone(zone.zone)
            }
          })

        }
      })

    }catch (e) {

    }
  }

  useEffect(()=> {
    if(areas && operatorZone) {
      areas.map(area=> {
        if(area.zonecode === operatorZone) {
          setArea(area.xarea)
        }
      })
    }
  },[areas, operatorZone]);

  useEffect(()=>{
    RouteUser();
    getAreas();
    getOperatorZone();
    ZoneUser();
  },[]);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={12}>
          <Card>
            <PrimaryHeader />
            <CardHeader className="d-flex align-items-center">
              <div className="w-25">
                Routes
              </div>
              {isAdmin? <RouteHeader />: null}
            </CardHeader>
            <CardBody>
              {isLoading && <Spinner />}
              {(routes && routes.length === 0 && !isLoading) && <div className="animated fadeIn pt-1 text-center">No Routes Available</div>}
              {(routes && routes.length > 0 && !isLoading) &&
              <Table responsive hover>
                <thead className={isAdmin? 'bg-dark': 'bg-twitter'} style={{color: '#696969'}}>
                <tr>
                  <th scope="col">Route</th>
                  <th scope="col">Route code</th>
                  <th scope="col">Price</th>
                  <th scope="col">Area</th>
                  {isAdmin? <th scope="col">Action</th>:null}
                </tr>
                </thead>
                <tbody>
                {(routes && (isAdmin || isLamata)) ? routes.sort((a, b) => parseFloat(b.id) - parseFloat(a.id)).map((user, index) =>
                  <UserRow key={index} user={user}/>
                ): null}
                {(routes && area && isOperator) ? routes.sort((a, b) => parseFloat(b.id) - parseFloat(a.id)).filter((user) => user.areacode === area).map((user, index) =>
                  <UserRow key={index} user={user}/>
                ): null}
                </tbody>
              </Table>}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
};
function mapDispatchToProps(dispatch) {
  return {
    RouteUser: () => dispatch(RouteUser()),
    getAreas: () => dispatch(getAreas()),
    ZoneUser: () => dispatch(ZoneUser()),
  };
}

const mapStateToProps = state => ({
  routes: state.route.routes,
  isLoading: state.route.isLoading,
  areas: state.area.areas,
  zones: state.zone.zones,
});

export default connect(mapStateToProps,mapDispatchToProps)(Routes);
