import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import {AppNavbarBrand} from "@coreui/react";
import zeno from "../../../assets/img/brand/mini-New-Logo-RGB.png";






const LoginType  = () => {

  const [dropdownOpen, setDropdown] = useState(new Array(6).fill(false));

  function toggle(i) {
    const newArray = dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    setDropdown(newArray)
  }

  return (
    <div className="app flex-row align-items-center" style={{background: "#fafafa"}}>
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md="12" className="text-center text-capitalize  font-weight-bold font-2xl text-primary">THE LAGOS STATE INTERMODAL TRANSPORTATION SYSTEM</Col>
        </Row>
        <Row className="justify-content-center mt-5" style={{minHeight: '60vh'}}>
          <Col md="5">
            <CardGroup>
              <Card className="px-4 bg-white pb-5">
                <CardBody>
                  <Form>
                    <AppNavbarBrand className="d-flex align-items-center justify-content-center mb-1"
                                    full={{src:zeno,  width: 80, height: 80, alt: 'Zeno Logo' }}
                    />
                    {/*<h1>Login</h1>*/}
                    <p className="text-primary text-center">Select Account Type</p>
                    <Dropdown isOpen={dropdownOpen[0]} toggle={() => {
                      toggle(0);
                    }}>
                      <DropdownToggle caret className="w-100 bg-white">
                      </DropdownToggle>
                      <DropdownMenu className="w-100">
                        {/*<Link to="/login" style={{textDecoration: "none"}}><DropdownItem className='bg-white text-center text-primary p-2'>Admin</DropdownItem></Link>*/}
                        <Link to="/lamata/login" style={{textDecoration: "none"}}><DropdownItem className='bg-white text-center text-primary p-2'>Lamata</DropdownItem></Link>
                        <Link to="/operator/login" style={{textDecoration: "none"}}><DropdownItem className='bg-white text-center text-primary p-2'>Operator</DropdownItem></Link>
                        <Link to="/partner/login" style={{textDecoration: "none"}}><DropdownItem className='bg-white text-center text-primary p-2'>Partner</DropdownItem></Link>
                      </DropdownMenu>
                    </Dropdown>

                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <small className="font-italic">Powered by Zeno Digital Limited</small>
        </Row>
      </Container>
    </div>
    // <div className="app flex-row align-items-center" style={{background: "#fafafa"}}>
    //     <Container>
    //       <Row className="justify-content-center mb-5">
    //         <Col md="12" className="text-center text-capitalize  font-weight-bold font-2xl text-primary">THE LAGOS STATE INTERMODAL TRANSPORTATION SYSTEM</Col>
    //       </Row>
    //       <Row className="justify-content-center mt-5">
    //         <Col md="5">
    //           <CardGroup>
    //             <Card className="px-4 bg-dark">
    //               <CardBody>
    //                 <div className="animated fadeIn">
    //
    //                   <Dropdown isOpen={dropdownOpen[0]} toggle={() => {
    //                     toggle(0);
    //                   }}>
    //                     <DropdownToggle caret className="w-100">
    //                     </DropdownToggle>
    //                     <DropdownMenu className="w-100">
    //                        <Link to="/login" style={{textDecoration: "none"}}><DropdownItem className='bg-primary text-center p-0'>Admin</DropdownItem></Link>
    //                       <Link to="/lamata/login" style={{textDecoration: "none"}}><DropdownItem className='bg-primary text-center p-0'>Lamata</DropdownItem></Link>
    //                       <Link to="/operator/login" style={{textDecoration: "none"}}><DropdownItem className='bg-primary text-center p-0'>Operator</DropdownItem></Link>
    //                     </DropdownMenu>
    //                   </Dropdown>
    //                 </div>
    //               </CardBody>
    //             </Card>
    //           </CardGroup>
    //         </Col>
    //       </Row>
    //       <Row className="justify-content-center mt-5">
    //         <small className="font-italic">Powered by Zeno Digital Limited</small>
    //       </Row>
    //     </Container>
    //   </div>
    );
  };


export default LoginType;
