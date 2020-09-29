import React, {useEffect, useState} from 'react';
import {connect} from "react-redux"
import {Badge, Card, CardBody, CardHeader, Col, Row, Table, Input} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelopeSquare, faFilePdf, faPrint} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../spinner/Spinner";
import {
  searchDriver,
  approveDriver,
  clearDriverVehicleId,
  getMeRequestDrivers
} from "../../store/actions/driverAction";
import axios from "axios";
import api from "../../environments/environment";
import Pagination from "react-js-pagination";
import RequestMeDriverActionBtn from "./components/RequestMeDriverActionBtn";
import {getOperators} from "../../store/actions/operatorAction";




function UserRow(props) {
  const user = props.user;
  const operators =props.operators

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Refunds' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Inactive' ? 'danger' :
            'primary'
  };

  const getOperator = (id)=> {
    let operatorA = '';
    if(operators && id) {
      operators.map(operator=> {
        if(operator.id == id) {
          operatorA = operator.name
        }
      })
      if(operatorA) {
        return operatorA
      } else return 'Not available'
    }
  }



  return (
    <tr key={user.id}>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.phoneNo}</td>
      <td>{getOperator(user.operatorId)}</td>
      <td>{user.residentialAddress}</td>
      <td>{user.email}</td>
      {(user.status === "1") && <td><Badge color={getBadge("Active")}>Active</Badge></td> }
      {(user.status === "0") && <td><Badge color={getBadge("Inactive")}>Inactive</Badge></td> }
      {(user.status === "") && <td><Badge color={getBadge("Pending")}>Pending</Badge></td> }
      <td> <RequestMeDriverActionBtn id={user.id} /> </td>
    </tr>
  )
}

const MeRequestDrivers = ({getMeRequestDrivers, drivers, driver, isLoading,  searchDriver, error,  approveDriver, getDriverVehicleId, getDriverVehicleId2, clearDriverVehicleId, operators, getOperators}) => {
  const [formData, setFormData] = useState('');
  const [driverVehicle, setDriverVehicle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [posts, setPosts] = useState([]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost).sort((a, b) => parseFloat(b.id) - parseFloat(a.id));

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };





useEffect(()=> {
  if(formData && drivers){
    const search = drivers.filter(post => {
      return post.firstname.toLowerCase().includes(formData.toLowerCase())
    });
    setPosts(search)
  }
},[formData]);

useEffect(()=> {
  if(drivers && !formData) {
    setPosts(drivers)
  }
},[drivers, formData]);


  useEffect(()=>{
    getMeRequestDrivers();
    getOperators();
      },[]);

  function getDriverVehicle() {
    axios.get(`${api.driverVehicles}/api/drivervehicles/`)
      .then(res=> {
        setDriverVehicle(res.data);
      })
  }

  function changeDriverVehicleStatus(id, status) {
    driverVehicle.map(DV=> {
      if(DV.driverId === id) {
        assignVehicle(DV.vehicleId, status)
      }
    })
  }

  function assignVehicle(id, status) {
    axios.put(`${api.vehicle}/api/assign/driver/${id}/?assign=${status}`)
      .then(res=> {
        if(res) {
          clearDriverVehicleId()
        }
      })
  }

useEffect(()=> {
  getDriverVehicle();
},[]);

useEffect(()=> {
  if(getDriverVehicleId) {
    changeDriverVehicleStatus(getDriverVehicleId, "null")
  }
},[getDriverVehicleId]);

  useEffect(()=> {
    if(getDriverVehicleId2) {
      changeDriverVehicleStatus(getDriverVehicleId2, "1")
    }
  },[getDriverVehicleId2]);



  const onChange = (e) =>{
    e.preventDefault();
    setFormData(e.target.value );
  };


  const onSearch = e => {
    e.preventDefault();
    searchDriver(formData)
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
                Drivers
              </div>
              {/*<DriverHeader />*/}
            </CardHeader>
            {isLoading && <Spinner />}
            {!isLoading &&
            <CardBody>
              {error && <div className="animated fadeIn pt-1 text-center text-danger mb-2 font-italic">{error}</div>}
              {/*{isLoading && loading()}*/}
              {(drivers && drivers.length === 0) &&
              <div className="animated fadeIn pt-1 text-center">No Driver Available</div>}
              {((drivers && drivers.length > 0) || driver) &&
              <Table responsive hover>
                <thead className="bg-dark">
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col"> Phone No</th>
                  <th scope="col">Residential Address</th>
                  <th scope="col">Email Address</th>
                  {/*<th scope="col">App status</th>*/}
                  {/*<th scope="col">Rating</th>*/}
                  {/*<th scope="col">Review</th>*/}
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {posts && currentPosts.filter((user) => user.acceptstatus === "0").map((user, index) =>
                  <UserRow key={index} user={user}  operator={operators}/>
                )}
                {driver &&
                <UserRow user={driver} approved={approveDriver}/>
                }
                </tbody>
              </Table>}
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
              {/*<Pagination*/}
              {/*  postsPerPage={postsPerPage}*/}
              {/*  totalPosts={posts.length}*/}
              {/*  paginate={paginate}*/}
              {/*/>*/}
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
    getMeRequestDrivers: () => dispatch(getMeRequestDrivers()),
    searchDriver: (id) => dispatch(searchDriver(id)),
    approveDriver: (id) =>dispatch(approveDriver(id)),
    clearDriverVehicleId: () =>dispatch(clearDriverVehicleId()),
    getOperators: () => dispatch(getOperators()),
  };
}

const mapStateToProps = state => ({
  drivers: state.driver.drivers,
  driver: state.driver.driver,
  error: state.driver.error,
  isLoading: state.driver.isLoading,
  approveId: state.driver.approveId,
  getDriverVehicleId: state.driver.getDriverVehicleId,
  getDriverVehicleId2: state.driver.getDriverVehicleId2,
  operators: state.operator.operators,
});

export default connect(mapStateToProps,mapDispatchToProps)(MeRequestDrivers);
