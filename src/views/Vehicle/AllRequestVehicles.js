import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Card, CardBody, CardHeader, Col, Row, Table, Input} from 'reactstrap';
import {getVehiclesRequestAll, searchVehicle} from "../../store/actions/vehicleAction";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelopeSquare, faFilePdf, faPrint} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../spinner/Spinner";
import {isAdmin} from "../../environments/constants";
import {getPartners} from "../../store/actions/partnerAction";
import AllRequestVehicleActionBtn from "./components/AllRequestVehicleActionBtn";
import Pagination from "react-js-pagination";
import {getOperators} from "../../store/actions/operatorAction";





function UserRow(props) {
  const user = props.user;
  const operators = props.operators


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
      <td>{user.mode}</td>
      <td>{user.vehicle_make}</td>
      <td>{user.vehicle_model}</td>
      <td>{user.plate_number}</td>
      <td>{user.capacity}</td>
      {/*{partners.length > 0 && partners.map(partner=> {*/}
      {/*  if(partner.id == user.partner_id) {*/}
      {/*    return <td key={[partner.id]}>{partner.name}</td>*/}
      {/*  }*/}
      {/*})}*/}
      {isAdmin?  <td>{getOperator(user.operator)}</td>: null}
      <td> <AllRequestVehicleActionBtn id={user.id} user={user} /> </td>
    </tr>
  )
}

const Vehicles = ({getVehiclesRequestAll, vehicles, vehicle, isLoading,  searchVehicle, error, operators, getOperators}) => {
  const [formData, setFormData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [posts, setPosts] = useState([]);
  const [partners, setPartners] = useState([]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)


  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };
  // const getPartner = async () => {
  //   try {
  //     const res = await axios.get(`${api.partner}/api/all/partners/`);
  //     setPartners(res.data)
  //   }catch (e) {
  //
  //   }
  // }

  useEffect(()=> {
    if(formData && vehicles){
      setCurrentPage(1)
      const search = vehicles.filter(post => {
        return post.mode.toLowerCase().includes(formData.toLowerCase())
      });
      setPosts(search)
    }
  },[formData]);

  useEffect(()=> {
    if(vehicles && !formData) {
      setPosts(vehicles.sort((a, b) => parseFloat(b.id) - parseFloat(a.id)))
    }
  },[vehicles, formData]);

  useEffect(()=>{
      getVehiclesRequestAll();
      getOperators();
     // getPartner();
  },[]);

  const onChange = (e) =>{
    e.preventDefault();
    setFormData(e.target.value );
  };


  const onSearch = e => {
    e.preventDefault();
    searchVehicle(formData)
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
                Vehicles
              </div>
            </CardHeader>
            {isLoading && <Spinner />}
            {!isLoading &&
            <CardBody>
              {error && <div className="animated fadeIn pt-1 text-center text-danger mb-2 font-italic">{error}</div>}
              {(vehicles && vehicles.length === 0) &&
              <div className="animated fadeIn pt-1 text-center">No Vehicles Available</div>}
              {((vehicles && vehicles.length > 0) || vehicle) &&
              <Table responsive hover>
                <thead className={isAdmin? 'bg-dark': 'bg-twitter'} style={{color: '#696969'}}>
                <tr>
                  <th scope="col">Vehicle Type</th>
                  <th scope="col">Vehicle Make</th>
                  <th scope="col">Vehicle Model</th>
                  <th scope="col">Vehicle Plate number</th>
                  <th scope="col">Capacity</th>
                  {/*<th scope="col">Partner</th>*/}
                   <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {posts && currentPosts.map((vehicle, index) =>
                  <UserRow key={index} user={vehicle} partners={partners} operators={operators}/>
                )}
                {vehicle &&
                <UserRow user={vehicle}/>
                }
                </tbody>
              </Table>}
            </CardBody>
            }
          </Card>
        </Col>
      </Row>
      {(!isLoading && posts.length > 0) &&
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
    getVehiclesRequestAll: () => dispatch(getVehiclesRequestAll()),
    searchVehicle: (id) => dispatch(searchVehicle(id)),
    getPartners: () => dispatch(getPartners()),
    getOperators: () => dispatch(getOperators()),
  };
}

const mapStateToProps = state => ({
  vehicles: state.vehicle.vehiclesAll,
  vehicle: state.vehicle.vehicle,
  error: state.vehicle.error,
  isLoading: state.vehicle.isLoading,
  partners: state.partners.partners,
  operators: state.operator.operators,

});

export default connect(mapStateToProps,mapDispatchToProps)(Vehicles);
