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
  ModalHeader, ModalFooter, CardFooter,
} from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {createNewUser, getListUser, updateUserInfo} from "../../api/userApi";
import {toast} from "react-toastify";

let currentDate = moment().format('DD/MM/YYYY');

class StaffManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      listUsers: [],
      nameToSearch: '',
      searchResult: null,

      username: '',
      password: '',
      fullName: '',
      phone: '',
      address: '',
      cmnd: '',
      startDateWork: null,
      endDateWork: null,
      roleOption: 2,
      note: '',
      userNew: {},

      phoneUpdate: '',
      nameUpdate: '',
      addressUpdate: '',
      cmndUpdate: '',
      startDateUpdate: null,
      endDateUpdate: null,
      noteUpdate: '',

      modalUpdate: false,
      activeTabModal: '1',
    };

    this.toggleCollapse = this.toggleCollapse.bind(this);
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

  toggleModal = (item) => {
    if(item) {
      this.setState(prevState => ({
        modalUpdate: !prevState.modalUpdate,
        phoneUpdate: item.phoneNumber,
        nameUpdate: item.fullName,
        addressUpdate: item.address,
        cmndUpdate: item.cmnd,
        noteUpdate: item.note,
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
    this.setState({startDateWork: date});
  }

  handleChangeEndDate(date) {
    this.setState({endDateWork: date});
  }

  handleChangeStartDateUpdate = (date) => {
    this.setState({startDateUpdate: date});
  };

  handleChangeEndDateUpdate = (date) => {
    this.setState({endDateUpdate: date});
  };

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
    const {username, password, roleOption, fullName, phone, address, cmnd, startDateWork, note} = this.state;
    const request = {
      username: username ? username : '',
      password: password ? username : '',
      role: roleOption ? roleOption : 2,
      fullName: fullName ? fullName : '',
      phoneNumber : phone ? phone : '',
      address: address ? address : '',
      cmnd: cmnd ? cmnd : '',
      startDateWork: startDateWork ? startDateWork : currentDate,
      note: note ? note : ''
    };
    console.log("request: "+JSON.stringify(request));
    createNewUser(request).then(res => {
      if(parseInt(res.data.returnCode) === 1)
      {
        this.setState({
          userNew: res.data.result
        })
      }
      else {
        toast.error(res.data.returnMessage);
      }
    }).catch(err => {
      console.log(err);
      toast.error("Không có phản hồi từ server.");
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

  handleUpdateUserInfo = () => {
    const {nameUpdate, phoneUpdate, addressUpdate, cmndUpdate,
      startDateUpdate, endDateUpdate, noteUpdate} = this.state;
    const {id} = this.state.userChooses;
    const request = {
      userId: id ? id : 0,
      fullName: nameUpdate,
      phoneNumber: phoneUpdate,
      address: addressUpdate,
      cmnd: cmndUpdate,
      startDateWork:startDateUpdate,
      endDateWork: endDateUpdate,
      note: noteUpdate
    };
    console.log("request: "+JSON.stringify(request));
    updateUserInfo(request).then(res => {
      if(parseInt(res.data.returnCode) === 1) {
        toast.success(res.data.returnMessage);
      }
      else {
        toast.error(res.data.returnMessage);
      }
    }).catch(err => {
      console.log(err);
      toast.error("Không có phản hồi. Vui lòng thử lại.")
    })
  };

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
          <td>{item.role}</td>
          <td>{item.note}</td>
        </tr>
    ))
  }

  handleResetForm = () => {
    document.getElementById("form-create-user").reset();
  };

  render() {
    const {listUsers, nameUpdate, phoneUpdate, addressUpdate, cmndUpdate,
      startDateUpdate, endDateUpdate, noteUpdate} = this.state;

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
                                    <td>{item.role}</td>
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
                  <form id="form-create-user">
                    <Row className="row justify-content-center" style={{padding:'20px 0'}}>
                      <h3><i className="fa fa-plus"/> Thêm nhân viên mới</h3>
                    </Row>
                    <Row className="row justify-content-center"
                          style={{padding:'20px 0'}}>
                      <Col xs="12" sm="5">
                        <FormGroup>
                          <Label htmlFor="text-input">Phân quyền</Label>
                          <select
                              className="form-control"
                              onChange={(e) => this.setState(
                                  {roleOption: e.target.value})}>
                            <option value={2}>Nhân viên</option>
                            <option value={1}>Quản lí</option>
                          </select>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup>
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="fa fa-user"></i></span>
                            </div>
                            <Input type="text" id="username" name="username"
                                   placeholder="Username"
                                   onChange={this.handleChange}/>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup>
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="fa fa-asterisk"></i></span>
                            </div>
                            <Input type="password" id="password" name="password"
                                   onChange={this.handleChange}
                                   placeholder="Password"/>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="5">
                        <FormGroup row>
                          <Col xs="12" sm="3">
                            <Label htmlFor="text-input">Họ và tên</Label>
                          </Col>
                          <Col xs="12" sm="9">
                            <Input name="fullName" type="text" id="fullName"
                                   placeholder="Họ tên nhân viên"
                                   onChange={this.handleChange} required/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col xs="12" sm="3">
                            <Label htmlFor="text-input">Số điện thoại</Label>
                          </Col>
                          <Col xs="12" sm="9">
                            <Input name="phone" type="text" id="phone"
                                   placeholder="Số điện thoại"
                                   onChange={this.handleChange} required/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col xs="12" sm="3">
                            <Label htmlFor="text-input">Địa chỉ</Label>
                          </Col>
                          <Col xs="12" sm="9">
                            <Input name="address" type="text" id="address"
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
                            <Input name="cmnd" type="text" id="cmnd"
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
                            <Input name="note" type="text" id="note"
                                   placeholder="Ghi chú tại đây"
                                   onChange={this.handleChange}/>
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                    <CardFooter>
                      <Row className="row justify-content-center">
                        <Col xs={12} sm={10}>
                          <Button type="submit" color="success"
                                  onClick={()=>this.handleAddNewUser()}>
                            <i className="fa fa-plus"/> Thêm</Button>
                          <Button type="reset" color="danger" className="pull-right"
                                  onClick={()=>this.handleResetForm()}>
                            <i className="fa fa-ban"></i> Reset</Button>
                        </Col>
                      </Row>
                    </CardFooter>
                  </form>
              </Card>
            </Col>
          </Row>

          <Modal isOpen={this.state.modalUpdate} toggle={()=>this.toggleModal()}
                 className={this.props.className}>
            <form id="form-update-user">
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
                    <Col xs="12" sm="12">
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Họ và tên</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <Input name="nameUpdate" type="text"
                                 placeholder="Họ tên nhân viên"
                                 value={nameUpdate ? nameUpdate : ''}
                                 onChange={this.handleChange}/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Số điện thoại</Label>
                        </Col>
                        <Col xs="12" sm="9" style={{display:'flex'}}>
                          <Input name="phoneUpdate" type="text"
                                 placeholder="Số điện thoại nhân viên"
                                 value={phoneUpdate ? phoneUpdate : ''}
                                 onChange={(e)=>this.setState({phoneUpdate: e.target.value})}/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Địa chỉ</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <Input name="addressUpdate" type="text"
                                 placeholder="Địa chỉ"
                                 value={addressUpdate ? addressUpdate : ''}
                                 onChange={this.handleChange}/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">CMND</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <Input name="cmndUpdate" type="text"
                                 placeholder="chứng minh nhân dân"
                                 value={cmndUpdate ? cmndUpdate : ''}
                                 onChange={this.handleChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Ngày kết thúc làm việc</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <DatePicker
                              className="form-control"
                              placeholderText={currentDate}
                              selected={endDateUpdate}
                              onChange={()=>this.handleChangeEndDateUpdate()}
                              dateFormat="DD/MM/YYYY"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Ghi chú</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <Input name="noteUpdate" type="text"
                                 value={noteUpdate ? noteUpdate : ''}
                                 placeholder="Ghi chú tại đây"
                                 onChange={this.handleChange}/>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            <ModalFooter>
              <Button color="success" onClick={()=>this.handleUpdateUserInfo()}>Cập nhật</Button>{' '}
              <Button color="danger" onClick={()=>this.toggleModal()}>Đóng</Button>
            </ModalFooter>
            </form>
          </Modal>
        </div>
    )
  }
}

export default StaffManagement;