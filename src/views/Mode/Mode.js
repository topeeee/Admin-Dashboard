import React, {useEffect, useState} from 'react';
import {connect} from "react-redux"
import axios from 'axios'
import {Card, CardBody, CardHeader, Col, Row, Table, Input} from 'reactstrap';
import {getModes, searchMode} from "../../store/actions/modeAction";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelopeSquare, faFilePdf, faPrint} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../spinner/Spinner";
import ModeHeader from "./components/ModeHeader";
import {getStates} from "../../store/actions/stateAction";
import {isAdmin, isLamata, isOperator, OperatorName} from "../../environments/constants";
import ModeActionBtn from "./components/ModeActionBtn";
import api from "../../environments/environment";




function UserRow(props) {
  const user = props.user;

  return (

    <tr key={user.id}>
      <td>{user.mode}</td>
      {/*<td>{user.modecode}</td>*/}
      <td>{user.service}</td>
      {isAdmin && <td> <ModeActionBtn id={user.id} /> </td>}
    </tr>
  )
}

const Mode = ({getModes, modes, mode, isLoading,  searchMode, error, getStates, states}) => {
  const [formData, setFormData] = useState('');
  // const [operatorMode, setOperatorMode] = useState([]);


 // async function getOperatorMode() {
 //   let newOperatorMode = []
 //    try {
 //    const res =  await axios.get(`${api.operatorMode}/api/mode/?operator_name=${OperatorName}`)
 //       res.data.forEach(operatorMode => {
 //         modes.forEach(mode=> {
 //           if(mode.mode === operatorMode.modecode) {
 //             newOperatorMode.push(mode)
 //           }
 //           setOperatorMode(newOperatorMode)
 //         })
 //       })
 //      setOperatorMode(newOperatorMode)
 //    }catch (e) {
 //
 //    }
 //  }

  useEffect(()=>{
    if(formData === ''){
      getModes();
      getStates();
    }
  },[formData]);

  // useEffect(()=> {
  //   if(modes) {
  //     getOperatorMode()
  //   }
  // },[modes]);



  const onChange = (e) =>{
    e.preventDefault();
    setFormData(e.target.value );
  };


  const onSearch = e => {
    e.preventDefault();
    searchMode(formData)
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
                Modes
              </div>
              {(isAdmin || isLamata) &&  <ModeHeader />}
            </CardHeader>
            {isLoading && <Spinner />}
            {!isLoading &&
            <CardBody>
              {error && <div className="animated fadeIn pt-1 text-center text-danger mb-2 font-italic">{error}</div>}
              {/*{isLoading && loading()}*/}
              {(modes && modes.length === 0) &&
              <div className="animated fadeIn pt-1 text-center">No Modes Available</div>}
              {((modes && modes.length > 0) || mode) &&
              <Table responsive hover>
                <thead className={!isAdmin? 'bg-twitter': 'bg-dark'} style={{color: '#696969'}}>
                <tr>
                  <th scope="col">Mode</th>
                  {/*<th scope="col">Mode Code</th>*/}
                  <th scope="col">Service</th>
                  {isAdmin && <th scope="col">Action</th>}
                </tr>
                </thead>
                <tbody>
                {(modes && (isAdmin || isLamata || isOperator)) ? modes.sort((a, b) => parseFloat(b.id) - parseFloat(a.id)).map((mode, index) =>
                  <UserRow key={index} user={mode}/>
                ): null}
                {/*{(operatorMode && isOperator) ? operatorMode.sort((a, b) => parseFloat(b.id) - parseFloat(a.id)).map((mode, index) =>*/}
                {/*  <UserRow key={index} user={mode}/>*/}
                {/*): null}*/}
                {mode &&
                <UserRow user={mode}/>
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
    getModes: () => dispatch(getModes()),
    searchMode: (id) => dispatch(searchMode(id)),
    getStates: () => dispatch(getStates()),
  };
}

const mapStateToProps = state => ({
  modes: state.mode.modes,
  mode: state.mode.mode,
  error: state.mode.error,
  isLoading: state.mode.isLoading,
  states: state.state.states,

});

export default connect(mapStateToProps,mapDispatchToProps)(Mode);


























// import React, { Component } from 'react';
// import {connect} from "react-redux"
// import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
// import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
// import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
// import {getStates} from '../../store/actions/stateAction'
//
// const line = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: 'rgba(75,192,192,0.4)',
//       borderColor: 'rgba(75,192,192,1)',
//       borderCapStyle: 'butt',
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: 'miter',
//       pointBorderColor: 'rgba(75,192,192,1)',
//       pointBackgroundColor: '#fff',
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//       pointHoverBorderColor: 'rgba(220,220,220,1)',
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [65, 59, 80, 81, 56, 55, 40],
//     },
//   ],
// };
//
// const bar = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       backgroundColor: 'rgba(255,99,132,0.2)',
//       borderColor: 'rgba(255,99,132,1)',
//       borderWidth: 1,
//       hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//       hoverBorderColor: 'rgba(255,99,132,1)',
//       data: [65, 59, 80, 81, 56, 55, 40],
//     },
//   ],
// };
//
// const doughnut = {
//   labels: [
//     'Red',
//     'Green',
//     'Yellow',
//   ],
//   datasets: [
//     {
//       data: [300, 50, 100],
//       backgroundColor: [
//         '#FF6384',
//         '#36A2EB',
//         '#FFCE56',
//       ],
//       hoverBackgroundColor: [
//         '#FF6384',
//         '#36A2EB',
//         '#FFCE56',
//       ],
//     }],
// };
//
// const radar = {
//   labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       backgroundColor: 'rgba(179,181,198,0.2)',
//       borderColor: 'rgba(179,181,198,1)',
//       pointBackgroundColor: 'rgba(179,181,198,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(179,181,198,1)',
//       data: [65, 59, 90, 81, 56, 55, 40],
//     },
//     {
//       label: 'My Second dataset',
//       backgroundColor: 'rgba(255,99,132,0.2)',
//       borderColor: 'rgba(255,99,132,1)',
//       pointBackgroundColor: 'rgba(255,99,132,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(255,99,132,1)',
//       data: [28, 48, 40, 19, 96, 27, 100],
//     },
//   ],
// };
//
// const pie = {
//   labels: [
//     'Red',
//     'Green',
//     'Yellow',
//   ],
//   datasets: [
//     {
//       data: [300, 50, 100],
//       backgroundColor: [
//         '#FF6384',
//         '#36A2EB',
//         '#FFCE56',
//       ],
//       hoverBackgroundColor: [
//         '#FF6384',
//         '#36A2EB',
//         '#FFCE56',
//       ],
//     }],
// };
//
// const polar = {
//   datasets: [
//     {
//       data: [
//         11,
//         16,
//         7,
//         3,
//         14,
//       ],
//       backgroundColor: [
//         '#FF6384',
//         '#4BC0C0',
//         '#FFCE56',
//         '#E7E9ED',
//         '#36A2EB',
//       ],
//       label: 'My dataset' // for legend
//     }],
//   labels: [
//     'Red',
//     'Green',
//     'Yellow',
//     'Grey',
//     'Blue',
//   ],
// };
//
// const options = {
//   tooltips: {
//     enabled: false,
//     custom: CustomTooltips
//   },
//   maintainAspectRatio: false
// }
//
// class Mode extends Component {
//   render() {
//     return (
//       <div className="animated fadeIn">
//         <CardColumns className="cols-3" style={{display:"flex", flexWrap: "wrap"}}>
//           {/*<Card>*/}
//           {/*  <CardHeader>*/}
//           {/*    Line Chart*/}
//           {/*    <div className="card-header-actions">*/}
//           {/*      <a href="http://www.chartjs.org" className="card-header-action">*/}
//           {/*        <small className="text-muted">docs</small>*/}
//           {/*      </a>*/}
//           {/*    </div>*/}
//           {/*  </CardHeader>*/}
//           {/*  <CardBody>*/}
//           {/*    <div className="chart-wrapper">*/}
//           {/*      <Line data={line} options={options} />*/}
//           {/*    </div>*/}
//           {/*  </CardBody>*/}
//           {/*</Card>*/}
//           {/*<Card>*/}
//           {/*  <CardHeader>*/}
//           {/*    Bar Chart*/}
//           {/*    <div className="card-header-actions">*/}
//           {/*      <a href="http://www.chartjs.org" className="card-header-action">*/}
//           {/*        <small className="text-muted">docs</small>*/}
//           {/*      </a>*/}
//           {/*    </div>*/}
//           {/*  </CardHeader>*/}
//           {/*  <CardBody>*/}
//           {/*    <div className="chart-wrapper">*/}
//           {/*      <Bar data={bar} options={options} />*/}
//           {/*    </div>*/}
//           {/*  </CardBody>*/}
//           {/*</Card>*/}
//           {/*<Card>*/}
//           {/*  <CardHeader>*/}
//           {/*    Doughnut Chart*/}
//           {/*    <div className="card-header-actions">*/}
//           {/*      <a href="http://www.chartjs.org" className="card-header-action">*/}
//           {/*        <small className="text-muted">docs</small>*/}
//           {/*      </a>*/}
//           {/*    </div>*/}
//           {/*  </CardHeader>*/}
//           {/*  <CardBody>*/}
//           {/*    <div className="chart-wrapper">*/}
//           {/*      <Doughnut data={doughnut} />*/}
//           {/*    </div>*/}
//           {/*  </CardBody>*/}
//           {/*</Card>*/}
//           {/*<Card>*/}
//           {/*  <CardHeader>*/}
//           {/*    Radar Chart*/}
//           {/*    <div className="card-header-actions">*/}
//           {/*      <a href="http://www.chartjs.org" className="card-header-action">*/}
//           {/*        <small className="text-muted">docs</small>*/}
//           {/*      </a>*/}
//           {/*    </div>*/}
//           {/*  </CardHeader>*/}
//           {/*  <CardBody>*/}
//           {/*    <div className="chart-wrapper">*/}
//           {/*      <Radar data={radar} />*/}
//           {/*    </div>*/}
//           {/*  </CardBody>*/}
//           {/*</Card>*/}
//           <Card className="cus-card">
//
//             <CardHeader className="bg-dark" style={{fontSize: 15, fontWeight: 600}}>
//               Zeno Lyte
//               <div className="card-header-actions">
//                 {/*<a href="#" className="card-header-action">*/}
//                 {/*  <small className="text-muted">ZenoLyte</small>*/}
//                 {/*</a>*/}
//               </div>
//             </CardHeader>
//             <CardBody className="d-flex justify-content-center align-items-center">
//               <div className="custom-card d-flex justify-content-center align-items-center flex-column">
//                 <div>Total</div>
//               <div style={{fontSize:"200%"}}>3000</div>
//               </div>
//               <div className="pl-2">
//                 <div className="font-weight-bold py-2" style={{color:"orange"}}>Drivers: 500</div>
//                 <div className="font-weight-bold py-2" style={{color:"green"}}>Users: 500</div>
//                 <div className="font-weight-bold py-2" style={{color:"lightblue"}}>Buses: 500</div>
//               </div>
//               {/*<div className="chart-wrapper">*/}
//               {/*  <Pie data={pie} />*/}
//               {/*</div>*/}
//             </CardBody>
//           </Card>
//           <Card className="cus-card">
//
//             <CardHeader className="bg-dark">
//               Zeno Lyte
//               <div className="card-header-actions">
//                 {/*<a href="#" className="card-header-action">*/}
//                 {/*  <small className="text-muted">ZenoLyte</small>*/}
//                 {/*</a>*/}
//               </div>
//             </CardHeader>
//             <CardBody>
//               <div className="custom-card d-flex justify-content-center align-items-center">12%</div>
//               {/*<div className="chart-wrapper">*/}
//               {/*  <Pie data={pie} />*/}
//               {/*</div>*/}
//             </CardBody>
//           </Card>
//           <Card className="cus-card">
//
//             <CardHeader className="bg-dark">
//               Zeno Lyte
//               <div className="card-header-actions">
//                 {/*<a href="#" className="card-header-action">*/}
//                 {/*  <small className="text-muted">ZenoLyte</small>*/}
//                 {/*</a>*/}
//               </div>
//             </CardHeader>
//             <CardBody>
//               <div className="custom-card d-flex justify-content-center align-items-center">12%</div>
//               {/*<div className="chart-wrapper">*/}
//               {/*  <Pie data={pie} />*/}
//               {/*</div>*/}
//             </CardBody>
//           </Card>
//           <Card className="cus-card">
//
//             <CardHeader className="bg-dark">
//               Zeno Lyte
//               <div className="card-header-actions">
//                 {/*<a href="#" className="card-header-action">*/}
//                 {/*  <small className="text-muted">ZenoLyte</small>*/}
//                 {/*</a>*/}
//               </div>
//             </CardHeader>
//             <CardBody>
//               <div className="custom-card d-flex justify-content-center align-items-center">12%</div>
//               {/*<div className="chart-wrapper">*/}
//               {/*  <Pie data={pie} />*/}
//               {/*</div>*/}
//             </CardBody>
//           </Card>
//           <Card className="cus-card">
//
//             <CardHeader className="bg-dark">
//               Zeno Lyte
//               <div className="card-header-actions">
//                 {/*<a href="#" className="card-header-action">*/}
//                 {/*  <small className="text-muted">ZenoLyte</small>*/}
//                 {/*</a>*/}
//               </div>
//             </CardHeader>
//             <CardBody>
//               <div className="custom-card d-flex justify-content-center align-items-center">12%</div>
//               {/*<div className="chart-wrapper">*/}
//               {/*  <Pie data={pie} />*/}
//               {/*</div>*/}
//             </CardBody>
//           </Card>
//
//           {/*<Card>*/}
//           {/*  <CardHeader>*/}
//           {/*    Polar Area Chart*/}
//           {/*    <div className="card-header-actions">*/}
//           {/*      <a href="http://www.chartjs.org" className="card-header-action">*/}
//           {/*        <small className="text-muted">docs</small>*/}
//           {/*      </a>*/}
//           {/*    </div>*/}
//           {/*  </CardHeader>*/}
//           {/*  <CardBody>*/}
//           {/*    <div className="chart-wrapper">*/}
//           {/*      <Polar data={polar} options={options}/>*/}
//           {/*    </div>*/}
//           {/*  </CardBody>*/}
//           {/*</Card>*/}
//         </CardColumns>
//         <button onClick={()=>this.props.getStates()}>submit</button>
//       </div>
//     );
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     getStates: () => dispatch(getStates())
//   };
// }
//
// export default connect(null, mapDispatchToProps)(Mode);
