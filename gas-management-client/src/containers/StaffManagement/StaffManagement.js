import React, {Component} from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Input,
  InputGroup,
  Button,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  FormGroup,
  Label,
  Modal,
  ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {createNewUser, getListUser} from "../../api/userApi";
import {toast} from "react-toastify";

class StaffManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      listUsers: [],
      nameToSearch: '',
      searchResult: null,
      activeTab: '1',
      userChooses: {},

      username: '',
      password: '',
      fullName: '',
      phone: '',
      address: '',
      cmnd: '',
      startDateWork: null,
      endDateWork: null,
      roleOption: 1,
      note: '',
      userNew: {},

      modalUpdate: false,
      activeTabModal: '1',
    };

    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.renderSearchResult = this.renderSearchResult.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.toggleTabModal = this.toggleTabModal.bind(this);
  }

  toggleCollapse() {
    this.setState({collapse: !this.state.collapse});
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleModal = (item) => {
    if(item) {
      this.setState(prevState => ({
        modalUpdate: !prevState.modalUpdate,
        userChooses: item
      }));
    }
    else {
      this.setState(prevState => ({
        modalUpdate: !prevState.modalUpdate
      }));
    }
  };

  toggleTabModal(tab) {
    if (this.state.activeTabModal !== tab) {
      this.setState({
        activeTabModal: tab
      });
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleChangeStartDate(date) {
    this.setState({
      startDateWork: date
    });
  }

  handleChangeEndDate(date) {
    this.setState({
      endDateWork: date
    });
  }

  componentDidMount() {
    getListUser().then(res => {
      this.setState({
        listUsers: res.data.result
      })
    }).catch(err => {
      console.log(err);
      toast.error("Lấy danh sách nhân viên thất bại.")
    })
  }

  handleAddNewUser = () => {
    const {username, password, fullName, phone, address, cmnd, startDateWork, note} = this.state;
    const request = {
      username: username ? username : '',
      password: password ? username : '',
      fullName: fullName ? fullName : '',
      phoneNumber : phone ? phone : '',
      address: address ? address : '',
      cmnd: cmnd ? cmnd : '',
      startDateWork: startDateWork ? startDateWork : '',
      note: note ? note : ''
    };
    createNewUser(request).then(res => {
      this.setState({
        userNew: res.data.result
      })
    }).catch(err => {
      console.log(err);
      toast.error("Thêm nhân viên thành công.");
    })
  };

  searchUser() {
    const {listUsers, nameToSearch} = this.state;
    const checkCondition = (str, fullStr) => {
      return fullStr.includes(str)
    };
    const userFiltered = listUsers.filter(
        user => checkCondition(nameToSearch, user.username) || checkCondition(
            nameToSearch, user.fullName));
    this.setState({
      searchResult: userFiltered
    })
  }

  renderSearchResult() {
    const {searchResult} = this.state;
    return searchResult.map((item, i) => (
        <tr key={i}>
          <td>{i+1}</td>
          <td>
            <a className="btn btn-primary"
               style={{width: "100px"}}
               onClick={this.toggleModal}>{"NV000"+item.id}
              <i className="fa fa-user-o"
                 style={{paddingLeft: "7px"}}></i>
            </a>
          </td>
          <td>{item.fullName}</td>
          <td>{item.phoneNumber}</td>
          <td>
            <p style={{width:'150px'}}>{item.address}</p>
          </td>
          <td>{item.cmnd}</td>
          <td>{item.startDateWork}</td>
          <td>{item.endDateWork}</td>
          <td>{item.note}</td>
          <td>{item.note}</td>
        </tr>
    ))
  }

  handleResetForm = () => {
    document.getElementById("form-create-user").reset();
  };

  render() {
    const {listUsers} = this.state;
    const {fullName, phoneNumber, address, cmnd, startDateWork, note} = this.state.userChooses;
    let currentDate = moment().format('DD/MM/YYYY');
    return (
        <div className="animated fadeIn parent-padding">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-edit"></i><strong>Danh sách nhân viên</strong>
                  <div className="card-actions">
                    <Button className="btn btn-minimize"
                            data-target="#collapseExample"
                            onClick={this.toggleCollapse}><i
                        className="icon-arrow-up"></i>
                    </Button>
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse} id="collapseExample">
                  <CardBody>
                    <Row style={{marginBottom: '20px'}}>
                      <Col xs="12" sm="12">
                        <InputGroup style={{width: '50%', float: 'right'}}>
                          <Input type="text" id="input1-group2"
                                 name="search"
                                 placeholder="Tên đăng nhập hoặc họ và tên"
                                 onChange={this.handleChange}/>
                          <div className="input-group-prepend">
                            <Button type="button" color="primary"
                                    onClick={this.searchUser}>
                              <i className="fa fa-search"></i>
                            </Button>
                          </div>
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row style={{marginBottom: '20px'}}>
                      <Col xs="12" sm="12">
                        <Table responsive striped>
                          <thead>
                          <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">ID Nhân viên</th>
                            <th className="text-center">Họ và tên</th>
                            <th className="text-center">Số điện thoại</th>
                            <th className="text-center">Địa chỉ</th>
                            <th className="text-center">CMND</th>
                            <th className="text-center">Ngày bắt đầu làm việc</th>
                            <th className="text-center">Ngày kết thúc làm việc</th>
                            <th className="text-center">Phân quyền</th>
                            <th className="text-center">Ghi chú</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                            listUsers ? listUsers.map((item, i) => {
                              return (
                                  <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>
                                      <a className="btn btn-primary"
                                         style={{width: "100px"}}
                                         onClick={()=>this.toggleModal(item)}>{"NV000"+item.id}
                                        <i className="fa fa-user-o"
                                           style={{paddingLeft: "7px"}}></i>
                                      </a>
                                    </td>
                                    <td>{item.fullName}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>
                                      <p style={{width:'150px'}}>{item.address}</p>
                                    </td>
                                    <td>{item.cmnd}</td>
                                    <td>{item.startDateWork}</td>
                                    <td>{item.endDateWork}</td>
                                    <td>{item.note}</td>
                                    <td>{item.note}</td>
                                  </tr>
                              )
                            })
                                : null
                          }
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </CardBody>
                </Collapse>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <Nav pills>
                    <NavItem>
                      <NavLink className={classnames(
                          {active: this.state.activeTab === '1'})}
                               onClick={() => {
                                 this.toggleTab('1');
                               }}><strong><i className="fa fa-plus"/> Thêm nhân viên mới</strong>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <form id="form-create-user">
                        <Row>
                          <Col xs="12" sm="6">
                            <FormGroup>
                              <Label htmlFor="text-input">Phân quyền</Label>
                              <select
                                  className="form-control"
                                  onChange={(e) => this.setState(
                                      {roleOption: e.target.value})}>
                                <option value={1}>Nhân viên</option>
                                <option value={2}>Quản lí</option>
                              </select>
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="6">
                            <FormGroup row>
                              <Col xs="12" sm="3">
                                <Label htmlFor="text-input">Họ và tên</Label>
                              </Col>
                              <Col xs="12" sm="9">
                                <Input name="fullName" type="text" id="text-input"
                                       placeholder="Họ tên nhân viên"
                                       onChange={this.handleChange} required/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" sm="3">
                                <Label htmlFor="text-input">Số điện thoại</Label>
                              </Col>
                              <Col xs="12" sm="9">
                                <Input name="phone" type="text" id="text-input"
                                       placeholder="Số điện thoại"
                                       onChange={this.handleChange} required/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" sm="3">
                                <Label htmlFor="text-input">Địa chỉ</Label>
                              </Col>
                              <Col xs="12" sm="9">
                                <Input name="address" type="text" id="text-input"
                                       placeholder="Địa chỉ"
                                       onChange={this.handleChange}
                                       required/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" sm="3">
                                <Label htmlFor="text-input">CMND</Label>
                              </Col>
                              <Col xs="12" sm="9">
                                <Input name="cmnd" type="text" id="text-input"
                                       placeholder="chứng minh nhân dân"
                                       onChange={this.handleChange}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" sm="3">
                                <Label htmlFor="text-input">Ngày bắt đầu làm
                                  việc</Label>
                              </Col>
                              <Col xs="12" sm="9">
                                <DatePicker
                                    className="form-control"
                                    placeholderText={currentDate}
                                    selected={this.state.startDateWork}
                                    onChange={this.handleChangeStartDate}
                                    dateFormat="DD/MM/YYYY"
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" sm="3">
                                <Label htmlFor="text-input">Ghi chú</Label>
                              </Col>
                              <Col xs="12" sm="9">
                                <Input name="note" type="text" id="text-input"
                                       placeholder="Ghi chú tại đây"
                                       onChange={this.handleChange}/>
                              </Col>
                            </FormGroup>
                          </Col>
                          <Button type="submit" color="success"
                                  onClick={()=>this.handleAddNewUser()}
                                  style={{marginLeft:'20px'}}>
                            <i className="fa fa-plus"/> Thêm</Button>
                          <Button type="reset" color="danger" onClick={()=>this.handleResetForm()}>
                            <i className="fa fa-ban"></i> Reset</Button>
                        </Row>
                      </form>
                    </TabPane>
                  </TabContent>
              </Card>
            </Col>
          </Row>

          <Modal isOpen={this.state.modalUpdate} toggle={()=>this.toggleModal()}
                 className={'modal-lg modal-lg-custom' + this.props.className}
                 style={{maxWidth:'90%'}}
          >
            <ModalHeader toggle={()=>this.toggleModal()}>
              <Nav pills>
                <NavItem>
                  <NavLink className={classnames(
                      {active: this.state.activeTabModal === '1'})}
                           onClick={() => {this.toggleTabModal('1');
                           }}><strong>Cập nhật thông tin nhân viên</strong>
                  </NavLink>
                </NavItem>
              </Nav>
            </ModalHeader>
              <TabContent activeTab={this.state.activeTabModal}>
                <TabPane tabId="1">
                  <Row>
                    <Col xs="12" sm="6">
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Họ và tên</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <Input name="fullName" type="text" id="text-input"
                                 placeholder="Họ tên nhân viên"
                                 value={fullName ? fullName : ''}
                                 onChange={this.handleChange}/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Số điện thoại</Label>
                        </Col>
                        <Col xs="12" sm="9" style={{display:'flex'}}>
                          <Input name="phone" type="text" id="text-input"
                                 placeholder="Số điện thoại nhân viên"
                                 style={{width:'90%'}}
                                 value={phoneNumber ? phoneNumber : ''}
                                 onChange={this.handleChange}/>
                          <Button type="submit" color="success"
                                  style={{marginLeft:'10px'}}
                          >
                            <i className="fa fa-plus"/> Thêm</Button>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Địa chỉ</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <Input name="address" type="text" id="text-input"
                                 placeholder="Địa chỉ"
                                 value={address ? address : ''}
                                 onChange={this.handleChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">CMND</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <Input name="cmnd" type="text" id="text-input"
                                 placeholder="chứng minh nhân dân"
                                 value={cmnd ? cmnd : ''}
                                 onChange={this.handleChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Ngày bắt đầu làm
                            việc</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <DatePicker
                              className="form-control"
                              placeholderText={currentDate}
                              selected={this.state.startDateWork}
                              onChange={this.handleChangeStartDate}
                              dateFormat="DD/MM/YYYY"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Ghi chú</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <Input name="note" type="text" id="text-input"
                                 value={note ? note : ''}
                                 placeholder="Ghi chú tại đây"
                                 onChange={this.handleChange}/>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            <ModalFooter>
              <Button color="primary" onClick={()=>this.toggleModal()}>Cập nhật</Button>{' '}
              <Button color="secondary" onClick={()=>this.toggleModal()}>Đóng</Button>
            </ModalFooter>
          </Modal>
        </div>
    )
  }
}

export default StaffManagement;