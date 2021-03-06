import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import {connect} from "react-redux"
import {toggleFerryStopModalUpdate} from "../../../store/actions/ferryStopAction";


function mapDispatchToProps(dispatch) {
  return {
    toggleFerryStopModalUpdate: (id) => dispatch(toggleFerryStopModalUpdate(id))
  };
}

class FerryStopActionBtn extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(6).fill(false),
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">

        <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {
          this.toggle(0);
        }}>
          <DropdownToggle caret>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem className='bg-info text-center p-0' onClick={()=>this.props.toggleFerryStopModalUpdate(this.props.id)}>Update</DropdownItem>
            {/*<DropdownItem className='bg-warning text-center' onClick={()=>this.props.toggleBusAssistantModalStatus()}>Change Status</DropdownItem>*/}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(FerryStopActionBtn);
