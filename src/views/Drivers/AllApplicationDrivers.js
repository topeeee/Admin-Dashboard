import React, {useEffect, useState} from 'react';
import {connect} from "react-redux"
import {Card, CardBody, CardHeader, Col, Row, Table, Input} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelopeSquare, faFilePdf, faPrint} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../spinner/Spinner";
import {searchDriver, approveDriver, clearDriverVehicleId, getAllApplicationDrivers} from "../../store/actions/driverAction";
import Pagination from "react-js-pagination";
import ApplicationDriverActionBtn from "./components/ApplicationDriverActionBtn";
import {isLamata} from "../../environments/constants";




function UserRow(props) {
  const user = props.user;

  return (
    <tr key={user.id}>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.phoneNo}</td>
      <td> <ApplicationDriverActionBtn user={user} /> </td>
    </tr>
  )
}

const AllApplicationDrivers = ({getAllApplicationDrivers, drivers, driver, isLoading,  searchDriver, error,  approveDriver}) => {

  const [formData, setFormData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [posts, setPosts] = useState([]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost).sort((a, b) => parseFloat(b.id) - parseFloat(a.id)).filter((user) => user.acceptstatus === "0");


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
    getAllApplicationDrivers();
      },[]);

  const onChange = (e) =>{
    e.preventDefault();
    setFormData(e.target.value );
  };



  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader className="bg-secondary d-flex">
              <div className="w-75 d-flex align-items-center ">
                <form className="w-100 d-flex align-items-center">
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
            </CardHeader>
            {isLoading && <Spinner />}
            {!isLoading &&
            <CardBody>
              {error && <div className="animated fadeIn pt-1 text-center text-danger mb-2 font-italic">{error}</div>}
              {(drivers && drivers.length === 0) &&
              <div className="animated fadeIn pt-1 text-center">No Driver Available</div>}
              {((drivers && drivers.length > 0) || driver) &&
              <Table responsive hover>
                <thead className={isLamata? 'bg-twitter': 'bg-dark'} style={{color: '#696969'}}>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col"> Phone No</th>
                  <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {posts && currentPosts.map((user, index) =>
                  <UserRow key={index} user={user} />
                )}
                </tbody>
              </Table>}
            </CardBody>
            }
          </Card>
        </Col>
      </Row>
      {(!isLoading && posts.length > 0) &&
      <div className="d-flex justify-content-end align-items-center mb-0">
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
    getAllApplicationDrivers: () => dispatch(getAllApplicationDrivers()),
    searchDriver: (id) => dispatch(searchDriver(id)),
    approveDriver: (id) =>dispatch(approveDriver(id)),
    clearDriverVehicleId: () =>dispatch(clearDriverVehicleId())
  };
}

const mapStateToProps = state => ({
  drivers: state.driver.drivers,
  driver: state.driver.driver,
  error: state.driver.error,
  isLoading: state.driver.isLoading,
  approveId: state.driver.approveId,
  getDriverVehicleId: state.driver.getDriverVehicleId,
  getDriverVehicleId2: state.driver.getDriverVehicleId2
});

export default connect(mapStateToProps,mapDispatchToProps)(AllApplicationDrivers);
