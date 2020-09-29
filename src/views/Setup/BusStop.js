import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Card, CardBody, CardHeader, Col, Row, Table, Input} from 'reactstrap';
import {BusStopUser, searchBusStop} from "../../store/actions/busStopAction";
import BusStopHeader from "./components/BusStopHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelopeSquare, faFilePdf, faPrint} from "@fortawesome/free-solid-svg-icons";
import {RouteUser} from "../../store/actions/routeAction";
import Spinner from "../../spinner/Spinner";
import BusStopActionBtn from "./components/BusStopActionBtn";
import {isAdmin} from "../../environments/constants";
import {getAreas} from "../../store/actions/areaAction";
import Pagination from "react-js-pagination";




function UserRow(props) {
  const user = props.user;


  return (
    <tr key={user.id}>
      <td>{user.station}</td>
      <td>{user.routecode}</td>
      <td>{user.latitude}</td>
      <td>{user.longitude}</td>
      <td>{user.direction}</td>
      {isAdmin ?  <td> <BusStopActionBtn id={user.id} /> </td>: null}
    </tr>
  )
}

const BusStops = ({BusStopUser, busStops, isLoading,RouteUser, routes, areas, getAreas}) => {
  const [formData, setFormData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [posts, setPosts] = useState([]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)


  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };



  useEffect(()=> {
    if(formData && busStops){
      setCurrentPage(1)
      const search = busStops.filter(post => {
        return (post.station.toLowerCase().includes(formData.toLowerCase()) || post.routecode.toLowerCase().includes(formData.toLowerCase()))
      });
      setPosts(search)
    }
  },[formData]);

  useEffect(()=> {
    if(busStops && !formData) {
      setPosts(busStops.sort((a, b) => parseFloat(b.id) - parseFloat(a.id)))
    }
  },[busStops, formData]);






  const onChange = (e) =>{
    e.preventDefault();
    setFormData(e.target.value );
  };




  useEffect(()=>{
    BusStopUser();
  },[]);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader className="bg-secondary d-flex">
              <div className="w-75 d-flex align-items-center ">
                <Input type="text"
                       // placeholder="Search by Name or Id"
                       className="w-25"
                       name="formData"
                       value={formData}
                       onChange={onChange}
                />
                <button className="btn btn-success">Search</button>
              </div>
              <div className="w-25 text-right">
                <FontAwesomeIcon className="text-warning py-2" title="Print" style={{fontSize: 40,  cursor: "pointer"}} icon={faPrint} onClick={()=> window.print()} />
                <FontAwesomeIcon className="text-primary py-2" title="Send to Email" style={{fontSize: 40,  cursor: "pointer"}} icon={faEnvelopeSquare} />
                <FontAwesomeIcon className="text-danger py-2" title="Download Pdf" style={{fontSize: 40,  cursor: "pointer"}} icon={faFilePdf} />
              </div>
            </CardHeader>
            <CardHeader className="d-flex align-items-center">
              <div className="w-25">
                Bus Stops
              </div>
              {isAdmin && <BusStopHeader />}
            </CardHeader>
            <CardBody>
              {isLoading && <Spinner />}
              {(busStops && busStops.length === 0 && !isLoading) && <div className="animated fadeIn pt-1 text-center">No Bus Stops Available</div>}
              {(busStops && busStops.length > 0 && !isLoading) &&
              <Table responsive hover>
                <thead className={isAdmin? 'bg-dark': 'bg-twitter'} style={{color: '#696969'}}>
                <tr>
                  {/*<th scope="col">Id</th>*/}
                  <th scope="col"> Bus Stop</th>
                  {/*<th scope="col"> Bus Stop Code</th>*/}
                  <th scope="col">Route</th>
                  <th scope="col">Latitude</th>
                  <th scope="col">Longitude</th>
                  <th scope="col">Direction</th>
                  {isAdmin ? <th scope="col">Action</th>: null}
                </tr>
                </thead>
                <tbody>
                {posts ? currentPosts.filter(user => user.service === 'First mile - Last mile').map((user, index) =>
                  <UserRow key={index} user={user} route={routes}/>
                ): null}
                </tbody>
              </Table>}
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!isLoading &&
      <div className="d-flex justify-content-end align-items-center">
        <Pagination
          activePage={currentPage}
          itemClass="page-item"
          linkClass="page-link"
          itemsCountPerPage={postsPerPage}
          totalItemsCount={posts.length}
          onChange={paginate}
        />
      </div>
      }
    </div>
  )
};
function mapDispatchToProps(dispatch) {
  return {
    BusStopUser: () => dispatch(BusStopUser()),
    searchBusStop: (id) => dispatch( searchBusStop(id)),
    RouteUser: () => dispatch(RouteUser()),
    getAreas: () => dispatch(getAreas()),
  };
}

const mapStateToProps = state => ({
  busStops: state.busStop.busStops,
  isLoading: state.busStop.isLoading,
  routes: state.route.routes,
  areas: state.area.areas,

});

export default connect(mapStateToProps,mapDispatchToProps)(BusStops);
