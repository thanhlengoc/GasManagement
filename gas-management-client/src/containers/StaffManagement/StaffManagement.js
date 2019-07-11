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
import ImageUploader from 'react-images-upload';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class StaffManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      listUsers: null,
      nameToSearch: '',
      searchResult: null,
      activeTab: '1',
      fullName: '',
      phone: '',
      birthday: '',
      address: '',
      cmnd: '',
      startDateWork: null,
      endDateWork: null,
      salary: '',
      roleOption: 1,
      note: '',

      modalUpdate: false,
      activeTabModal: '1',
    };

    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.renderSearchResult = this.renderSearchResult.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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

  toggleModal() {
    this.setState(prevState => ({
      modalUpdate: !prevState.modalUpdate
    }));
  }

  toggleTabModal(tab) {
    if (this.state.activeTabModal !== tab) {
      this.setState({
        activeTabModal: tab
      });
    }
  }

  onDrop(pictureFiles) {
    this.setState({
      pictures: [].concat(pictureFiles)
    })
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    }, () => console.log(this.state))
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
  }

  searchUser() {
    const {listUsers, nameToSearch} = this.state
    const checkCondition = (str, fullStr) => {
      return fullStr.includes(str)
    };
    const userFiltered = listUsers.filter(
        user => checkCondition(nameToSearch, user.username) || checkCondition(
            nameToSearch, user.fullName))
    this.setState({
      searchResult: userFiltered
    })
  }

  renderSearchResult() {
    const {searchResult} = this.state
    return searchResult.map((item) => (<tr key={item.userId}>
      <td>{item.userId}</td>
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.fullName}</td>
      <td>{item.birthday}</td>
      <td>{item.address}</td>
      <td>{item.roles.map(roleItem => `${roleItem.role} , `)}</td>
    </tr>))
  }

  render() {
    const {
      listUsers, searchResult, fullName, phone, birthday, address,
      cmnd, salary, startDateWork, endDateWork
    } = this.state;
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
                        <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                          <thead className="thead-light">
                          <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">Avatar</th>
                            <th className="text-center">ID Nhân viên</th>
                            <th className="text-center">Họ và tên</th>
                            <th className="text-center">Số điện thoại</th>
                            <th className="text-center">Địa chỉ</th>
                            <th className="text-center">CMND</th>
                            <th className="text-center">Ngày sinh</th>
                            <th className="text-center">Ngày bắt đầu làm việc</th>
                            <th className="text-center">Ngày kết thúc làm việc</th>
                            <th className="text-center">Mức lương</th>
                            <th className="text-center">Phân quyền</th>
                            <th className="text-center">Ghi chú</th>
                          </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">{1}</td>
                              <td className="text-center">
                                <img src="https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/57226516_130649268042776_946875555297361920_o.jpg?_nc_cat=110&_nc_oc=AQnAUbB_GnrRVV2hRrmbdkCf26Wg6OaGJSagXxpGTQdDUpe5VEvtYBMlUQhAXm1T0rM&_nc_ht=scontent.fsgn1-1.fna&oh=0f0dcd644588e03002e1c6a0d5c1d504&oe=5DC66E90"
                                     className="avatar avatar-lg"/>
                              </td>
                              <td className="text-center">
                                <a className="btn btn-primary"
                                   style={{width: "100px"}}
                                   onClick={this.toggleModal}>NV0001
                                  <i className="fa fa-user-o"
                                     style={{paddingLeft: "7px"}}></i>
                                </a>
                              </td>
                              <td className="text-center">{"Lê Ngọc Thành"}</td>
                              <td>{"0359293504"}</td>
                              <td className="text-center">
                                <p style={{width:'150px'}}>2/11 Bạch Đằng, Phường2, Quận Tân Bình</p>
                              </td>
                              <td className="text-center">{"225707542"}</td>
                              <td className="text-center">{"02/01/1997"}</td>
                              <td className="text-center">{"28/06/2019"}</td>
                              <td className="text-center">
                                <p style={{width:'100px'}}>Hiện đang làm việc</p>
                              </td>
                              <td className="text-center">{"2,000,000đ/tháng"}</td>
                              <td className="text-center">{"Nhân Viên"}</td>
                              <th className="text-center">{"Trưởng ca"}</th>
                            </tr>
                            <tr>
                              <td className="text-center">{1}</td>
                              <td className="text-center">
                                <img src="https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/57226516_130649268042776_946875555297361920_o.jpg?_nc_cat=110&_nc_oc=AQnAUbB_GnrRVV2hRrmbdkCf26Wg6OaGJSagXxpGTQdDUpe5VEvtYBMlUQhAXm1T0rM&_nc_ht=scontent.fsgn1-1.fna&oh=0f0dcd644588e03002e1c6a0d5c1d504&oe=5DC66E90"
                                     className="avatar avatar-lg"/>
                              </td>
                              <td className="text-center">
                                <a className="btn btn-primary"
                                   style={{width: "100px"}}
                                   onClick={this.toggleModal}>NV0001
                                  <i className="fa fa-user-o"
                                     style={{paddingLeft: "7px"}}></i>
                                </a>
                              </td>
                              <td className="text-center">{"Lê Ngọc Thành"}</td>
                              <td>{"0359293504"}</td>
                              <td className="text-center">
                                <p style={{width:'150px'}}>2/11 Bạch Đằng, Phường2, Quận Tân Bình</p>
                              </td>
                              <td className="text-center">{"225707542"}</td>
                              <td className="text-center">{"02/01/1997"}</td>
                              <td className="text-center">{"28/06/2019"}</td>
                              <td className="text-center">
                                <p style={{width:'100px'}}>Hiện đang làm việc</p>
                              </td>
                              <td className="text-center">{"2,000,000đ/tháng"}</td>
                              <td className="text-center">{"Nhân Viên"}</td>
                              <th className="text-center">{"Trưởng ca"}</th>
                            </tr>
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
                               }}><strong>Thêm nhân viên mới</strong>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <form>
                        <Row>
                          <Col xs="12" sm="6">
                            <ImageUploader
                                withIcon={true}
                                buttonText='Chọn Ảnh Avatar'
                                onChange={this.onDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif',
                                  '.jpeg']}
                                maxFileSize={5242880}
                                withPreview={true}
                            />
                            <FormGroup>
                              <Label htmlFor="text-input">Mức lương</Label>
                              <Input name="salary" type="text" id="text-input"
                                     placeholder="vn đồng/tháng"
                                     onChange={this.handleChange}
                                     required/>
                            </FormGroup>
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
                                <Label htmlFor="text-input">Ngày sinh</Label>
                              </Col>
                              <Col xs="12" sm="9">
                                <Input name="birthday" type="text" id="text-input"
                                       placeholder="DD/MM/YYYY"
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
                                       required/>
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
                          <Button type="submit" color="success" style={{marginLeft:'20px'}}>
                            <i className="fa fa-plus"/> Thêm</Button>
                          <Button type="reset" color="danger">
                            <i className="fa fa-ban"></i> Đóng</Button>
                        </Row>
                      </form>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Modal isOpen={this.state.modalUpdate} toggle={this.toggleModal}
                 className={'modal-lg modal-lg-custom' + this.props.className}
                 style={{maxWidth:'90%'}}
          >
            <ModalHeader toggle={this.toggleModal}>
              <Nav pills>
                <NavItem>
                  <NavLink className={classnames(
                      {active: this.state.activeTabModal === '1'})}
                           onClick={() => {
                             this.toggleTabModal('1');
                           }}><strong>Cập nhật thông tin nhân viên</strong>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={classnames(
                      {active: this.state.activeTabModal === '2'})}
                           onClick={() => {
                             this.toggleTabModal('2');
                           }}><strong>Phiếu lương</strong>
                  </NavLink>
                </NavItem>
              </Nav>
            </ModalHeader>
            <ModalBody>
              <TabContent activeTab={this.state.activeTabModal}>
                <TabPane tabId="1">
                  <Row>
                    <Col xs="12" sm="6">
                      <ImageUploader
                          withIcon={true}
                          buttonText='Chọn Ảnh Avatar'
                          onChange={this.onDrop}
                          imgExtension={['.jpg', '.gif', '.png', '.gif',
                            '.jpeg']}
                          maxFileSize={5242880}
                          withPreview={true}
                      />
                      <FormGroup>
                        <Label htmlFor="text-input">Mức lương</Label>
                        <Input name="salary" type="text" id="text-input"
                               placeholder="vn đồng/tháng"
                               onChange={this.handleChange}
                               required/>
                      </FormGroup>
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
                        <Col xs="12" sm="9" style={{display:'flex'}}>
                          <Input name="phone" type="text" id="text-input"
                                 placeholder="Số điện thoại nhân viên"
                                 style={{width:'90%'}}
                                 onChange={this.handleChange} required/>
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
                                 onChange={this.handleChange}
                                 required/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Ngày sinh</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <Input name="birthday" type="text" id="text-input"
                                 placeholder="DD/MM/YYYY"
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
                                 required/>
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
                          <Label htmlFor="text-input">Ngày kết thúc làm
                            việc</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <DatePicker
                              className="form-control"
                              placeholderText={currentDate}
                              selected={this.state.endDateWork}
                              onChange={this.handleChangeEndDate}
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
                  </Row>
                </TabPane>
                <TabPane tabId="2">

                </TabPane>
              </TabContent>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggleModal}>Cập nhật</Button>{' '}
              <Button color="secondary" onClick={this.toggleModal}>Đóng</Button>
            </ModalFooter>
          </Modal>
        </div>
    )
  }
}

export default StaffManagement;