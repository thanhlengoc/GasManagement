import React, {Component} from 'react';
import {
  Button,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';
import HeaderDropdown from './HeaderDropdown';
import {handleLogout} from "../../services/AuthService";
import {toast} from "react-toastify";

class Header extends Component {

  constructor(props) {
    super(props);
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  handleLogout = () => {
    handleLogout().then(res => {
      console.log(res);
      toast.success("Đăng xuất thành công.")
    }).catch(err => {
      console.log(err);
      toast.error("Đăng xuất không thành công.")
    })
  };

  render() {
    const fullName = this.props.fullName;
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <NavbarBrand href="#"></NavbarBrand>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="#">
              <strong style={{color:'#23282c', fontSize:'16'}}>GAS HƯNG LỢI HƯNG</strong>
            </NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <HeaderDropdown accnt/>
          <NavLink href="#" style={{marginRight:'10px', color:'black'}}>
            {fullName ?
                <strong>{fullName}</strong> :
                'Tên đăng nhập'}
          </NavLink>
          <a className="btn btn-success" href="/logout"
             onClick={()=>this.handleLogout()}
                  style={{marginRight:'40px', color:'black', lineHeight:'0', border:'1px solid'}}
          >
            <i className="fa fa-sign-out"></i> Logout
          </a>
        </Nav>
      </header>
    );
  }
}

export default Header;
