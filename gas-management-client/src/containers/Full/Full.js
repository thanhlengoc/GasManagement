import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashboard/';
import Charts from '../../views/Charts/';
import GoogleMaps from '../../views/GoogleMaps/';
import Calendar from '../../views/Plugins/Calendar/';
import CustomerManagement from '../CustomerManagement';
import StaffManagement from '../StaffManagement';
import Invoice from '../BillManagement/Invoice';
import WarehouseManagement from '../WarehouseManagement/WarehouseManagement';
import {toast, ToastContainer} from "react-toastify";
import {getCurrentUser, getRoleOfCurrentUser} from "../../services/AuthService";


class Full extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      currentUser: {},
      fullName: ''
    }
  }

  componentDidMount() {
    getRoleOfCurrentUser().then(res => {
      this.setState({
        roles: res.data
      })
    }).catch(err => {
      console.log(err);
      toast.error("get role of current user fail.")
    });

    getCurrentUser().then(res => {
      this.setState({
        currentUser: res.data,
        fullName: res.data.fullName
      })
    }).catch(err => {
      console.log(err);
      toast.error("get current user fail.")
    });
  }

  render() {
    return (
      <div className="app">
        <Header fullName={this.state.fullName}/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb/>
            <Container fluid style={{padding:'0 15px'}}>
              <Switch>
                <Route exact path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route exact path="/customer" name="CustomerManagement"
                       component={()=><CustomerManagement fullName={this.state.fullName}/>}/>
                <Route exact path="/staff" name="StaffManagement" component={StaffManagement}/>
                <Route exact path="/bill/invoice" name="Invoice" component={Invoice}/>
                <Route exact path="/warehouse" name="Warehouse" component={WarehouseManagement}/>
                <Route exact path="/plugins/calendar" name="Calendar" component={Calendar}/>
                <Route exact path="/google-maps" name="Google Maps" component={GoogleMaps}/>
                <Route exact path="/charts" name="Charts" component={Charts}/>
                <Redirect from="/" to="/plugins/calendar"/>
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
        <ToastContainer position="top-right" autoClose={2000} style={{zIndex:'1999'}}/>
      </div>
    );
  }
}

export default Full;
