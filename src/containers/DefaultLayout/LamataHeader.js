import React, { Component } from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import {AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import zeno from '../../assets/img/brand/zeno.png'
import lamata from '../../assets/img/brand/lamata2.png'
import {LogOut} from "../../store/actions/authenticationAction";
import {connect} from "react-redux";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class LamataHeader extends Component {
  signOut(e) {
    e.preventDefault();
    this.props.LogOut()
    sessionStorage.clear()
    return <Redirect to="/login" />
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none text-dark" display="md" mobile />
        {/*<AppNavbarBrand*/}
        {/*  full={{src:zeno,  width: 89, height: 25, alt: 'Zeno Logo' }}*/}
        {/*  minimized={{src:zeno, width: 30, height: 30, alt: 'Zeno Logo' }}*/}
        {/*/>*/}
        <AppNavbarBrand
          full={{src:lamata,  width: 89, height: 40, alt: 'lamata Logo' }}
          minimized={{src:lamata, width: 30, height: 30, alt: 'lamata Logo' }}
          className="mt-1"
        />
        <AppSidebarToggler className="d-md-down-none text-dark" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link text-dark" >Dashboard</NavLink>
          </NavItem>
          {/*<NavItem className="px-3">*/}
          {/*  <Link to="/users" className="nav-link">Users</Link>*/}
          {/*</NavItem>*/}
          {/*<NavItem className="px-3">*/}
          {/*  <NavLink to="#" className="nav-link">Settings</NavLink>*/}
          {/*</NavItem>*/}
        </Nav>
        <Nav className="ml-auto" navbar>
          {/*<NavItem className="d-md-down-none">*/}
          {/*  <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>*/}
          {/*</NavItem>*/}
          {/*<NavItem className="d-md-down-none">*/}
          {/*  <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>*/}
          {/*</NavItem>*/}
          {/*<NavItem className="d-md-down-none">*/}
          {/*  <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>*/}
          {/*</NavItem>*/}
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/avatar.webp'} className="img-avatar bg-white" alt="avatar" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              {/*<DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>*/}
              {/*<DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>*/}
              {/*<DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>*/}
              {/*<DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>*/}
              {/*<DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>*/}
              {/*<DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>*/}
              {/*<DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>*/}
              {/*<DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>*/}
              {/*<DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>*/}
              {/*<DropdownItem divider />*/}
              {/*<DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>*/}
              <DropdownItem onClick={e => this.signOut(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-md-down-none" />*/}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

LamataHeader.propTypes = propTypes;
LamataHeader.defaultProps = defaultProps;

function mapDispatchToProps(dispatch) {
  return {
    LogOut: () => dispatch(LogOut())
  };
}

export default connect(null, mapDispatchToProps)(LamataHeader);
