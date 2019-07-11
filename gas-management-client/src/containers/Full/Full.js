import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashboard/';
import Colors from '../../views/Theme/Colors/';
import Typography from '../../views/Theme/Typography/';
import Charts from '../../views/Charts/';
// Base
import Switches from '../../views/Base/Switches/';
import Tabs from '../../views/Base/Tabs/';
// Editors
import TextEditors from '../../views/Editors/TextEditors';
import CodeEditors from '../../views/Editors/CodeEditors';
// Forms
import BasicForms from '../../views/Forms/BasicForms/';
import AdvancedForms from '../../views/Forms/AdvancedForms';
import GoogleMaps from '../../views/GoogleMaps/';
// Notifications
import Alerts from '../../views/Notifications/Alerts/';
import Badges from '../../views/Notifications/Badges/';
import Modals from '../../views/Notifications/Modals/';
import Toastr from '../../views/Notifications/Toastr/';
// Plugins
import Calendar from '../../views/Plugins/Calendar/';
import Spinners from '../../views/Plugins/Spinners/';

import CustomerManagement from '../CustomerManagement';
import StaffManagement from '../StaffManagement';
import Invoice from '../BillManagement/Invoice';
import IncomeSpend from '../BillManagement/IncomeSpend';
import EnterWarehouse from '../WarehouseManagement/EnterWarehouse';
import ExportWarehouse from '../WarehouseManagement/ExportWarehouse';
import WarehouseManagement from '../WarehouseManagement/WarehouseManagement';
import {getCurrentUser} from "../../api/userApi";
import {toast} from "react-toastify";


class Full extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: [],
      currentUser: {}
    }
  }

  componentDidMount() {
    getCurrentUser().then(res => {
      this.setState({
        role: res.data.roles,
        currentUser: res.data
      })
    }).catch(toast.error('login fail!'))
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>

                <Route path="/customer-management" name="CustomerManagement" component={CustomerManagement}/>
                <Route path="/staff-management" name="StaffManagement" component={StaffManagement}/>
                <Route path="/bill-management/invoice" name="Invoice" component={Invoice}/>
                <Route path="/bill-management/income-spend" name="IncomeAndSpend" component={IncomeSpend}/>
                <Route path="/warehouse-management" name="Warehouse" component={WarehouseManagement}/>
                <Route path="/warehouse-management/enter" name="EnterWarehouse" component={EnterWarehouse}/>
                <Route path="/warehouse-management/export" name="ExportWarehouse" component={ExportWarehouse}/>
                <Route path="/plugins/calendar" name="Calendar" component={Calendar}/>
                <Route path="/google-maps" name="Google Maps" component={GoogleMaps}/>

                <Route path="/theme/colors" name="Colors" component={Colors}/>
                <Route path="/theme/typography" name="Typography" component={Typography}/>
                <Route path="/base/switches" name="Swithces" component={Switches}/>
                <Route path="/base/tabs" name="Tabs" component={Tabs}/>
                <Route path="/charts" name="Charts" component={Charts}/>
                <Route path="/editors/text-editors" name="Text Editors" component={TextEditors}/>
                <Route path="/editors/code-editors" name="Code Editors" component={CodeEditors}/>
                <Route path="/forms/basic-forms" name="Basic Forms" component={BasicForms}/>
                <Route path="/forms/advanced-forms" name="Advanced Forms" component={AdvancedForms}/>
                <Route path="/notifications/alerts" name="Alerts" component={Alerts}/>
                <Route path="/notifications/badges" name="Badges" component={Badges}/>
                <Route path="/notifications/modals" name="Modals" component={Modals}/>
                <Route path="/notifications/toastr" name="Toastr" component={Toastr}/>
                <Route path="/plugins/spinners" name="Loading Buttons" component={Spinners}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
