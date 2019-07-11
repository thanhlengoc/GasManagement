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

class CustomerManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      listUsers: null,
      nameToSearch: '',
      searchResult: null,
      activeTab: '1',
      nameCustomer: '',
      phoneCustomer: '',
      birthdayCustomer: '',
      addressCustomer: '',
      startDatePurchase: null,
      lastDatePurchase: null,
      totalAmount: '',
      totalScore: '',
      customerType: 1,
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
                  <i className="fa fa-edit"></i><strong>Danh sách khách hàng</strong>
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
                                 placeholder="Tìm kiếm... (Tên hoặc số điênj thoại)"
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
                            <th>STT</th>
                            <th>Avatar</th>
                            <th>ID Khách hàng</th>
                            <th>Loại khách hàng</th>
                            <th>Tên khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Email</th>
                            <th>Ngày bắt đầu mua</th>
                            <th>Ngày mua gần nhất</th>
                            <th>Tổng số lượng</th>
                            <th>Tổng điểm</th>
                            <th>Ghi chú</th>
                          </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{1}</td>
                              <td>
                                {/*<img src="https://lh5.googleusercontent.com/-vUbIJwXnPJw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdLpvLNqcrXCwoJgbdfQVWm4Ob-MQ/mo/photo.jpg"*/}
                                     {/*className="avatar avatar-lg"/>*/}
                              </td>
                              <td>
                                <a className="btn btn-primary"
                                   style={{width: "100px"}}
                                   onClick={this.toggleModal}>KH0001
                                  <i className="fa fa-user-o"
                                     style={{paddingLeft: "7px"}}></i>
                                </a>
                              </td>
                              <td>{"Hộ gia đình"}</td>
                              <td>{"Lê Ngọc Thành"}</td>
                              <td>{"0359293504"}</td>
                              <td>
                                <p style={{width:'150px'}}>2/11 Bạch Đằng, Phường2, Quận Tân Bình</p>
                              </td>
                              <td>{"thanhlengoc@gmail.com"}</td>
                              <td>{"28/06/2019"}</td>
                              <td>{"29/06/2019"}</td>
                              <td>{"10 bình/tháng"}</td>
                              <td>{"100"}</td>
                              <td>{"Mua nợ chưa thanh toán, tích đủ điểm khuyến mãi"}</td>
                            </tr>
                            <tr>
                              <td>{2}</td>
                              <td>
                                {/*<img src="https://lh5.googleusercontent.com/-vUbIJwXnPJw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdLpvLNqcrXCwoJgbdfQVWm4Ob-MQ/mo/photo.jpg"*/}
                                     {/*className="avatar avatar-lg"/>*/}
                              </td>
                              <td>
                                <a className="btn btn-primary"
                                   style={{width: "100px"}}
                                   onClick={this.toggleModal}>KH0001
                                  <i className="fa fa-user-o"
                                     style={{paddingLeft: "7px"}}></i>
                                </a>
                              </td>
                              <td>{"Hộ gia đình"}</td>
                              <td>{"Lê Ngọc Thành"}</td>
                              <td>{"0359293504"}</td>
                              <td>
                                <p style={{width:'150px'}}>2/11 Bạch Đằng, Phường2, Quận Tân Bình</p>
                              </td>
                              <td>{"thanhlengoc@gmail.com"}</td>
                              <td>{"28/06/2019"}</td>
                              <td>{"29/06/2019"}</td>
                              <td>{"10 bình/tháng"}</td>
                              <td>{"100"}</td>
                              <td>
                                <p style={{width:'150px'}}>Mua nợ chưa thanh toán, tích đủ điểm khuyến mãi</p>
                              </td>
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
                               }}><strong>Thêm khách hàng mới</strong>
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
                              <Label htmlFor="text-input">Tên khách hàng</Label>
                              <Input name="nameCustomer" type="text" id="text-input"
                                     placeholder="Tên khách hàng"
                                     onChange={this.handleChange}
                                     required/>
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor="text-input">Loại khách hàng</Label>
                              <select
                                  className="form-control"
                                  onChange={(e) => this.setState(
                                      {customerType: e.target.value})}>
                                <option value={1}>Hộ gia đình</option>
                                <option value={2}>Doanh nghiệp</option>
                                <option value={3}>Đại lí cấp 1</option>
                                <option value={4}>Đại lí cấp 2</option>
                              </select>
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="6">
                            <FormGroup row>
                              <Col xs="12" sm="3">
                                <Label htmlFor="text-input">Tổng số lượng</Label>
                              </Col>
                              <Col xs="12" sm="9">
                                <Input name="totalAmount" type="text" id="text-input"
                                       placeholder="Tổng số lượng đến hiện tại đã mua"
                                       onChange={this.handleChange} required/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" sm="3">
                                <Label htmlFor="text-input">Tổng số điểm tích lũy</Label>
                              </Col>
                              <Col xs="12" sm="9">
                                <Input name="totalScore" type="text" id="text-input"
                                       placeholder="Điểm tích lũy khi khách mua gas"
                                       onChange={this.handleChange} required/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" sm="3">
                                <Label htmlFor="text-input">Số điện thoại</Label>
                              </Col>
                              <Col xs="12" sm="9">
                                <Input name="phoneCustomer" type="text" id="text-input"
                                       placeholder="Số điện thoại khách hàng"
                                       onChange={this.handleChange} required/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" sm="3">
                                <Label htmlFor="text-input">Địa chỉ</Label>
                              </Col>
                              <Col xs="12" sm="9">
                                <Input name="addressCustomer" type="text" id="text-input"
                                       placeholder="Địa chỉ khách hàng"
                                       onChange={this.handleChange}
                                       required/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" sm="3">
                                <Label htmlFor="text-input">Ngày bắt đầu mua</Label>
                              </Col>
                              <Col xs="12" sm="9">
                                <DatePicker
                                    className="form-control"
                                    placeholderText={currentDate}
                                    selected={this.state.startDatePurchase}
                                    onChange={this.handleChangeStartDate}
                                    dateFormat="DD/MM/YYYY"
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" sm="3">
                                <Label htmlFor="text-input">Ngày mua gần nhất</Label>
                              </Col>
                              <Col xs="12" sm="9">
                                <DatePicker
                                    className="form-control"
                                    placeholderText={currentDate}
                                    selected={this.state.lastDatePurchase}
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
                                  style={{marginLeft:'20px'}}>
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
                           }}><strong>Lập hóa đơn</strong>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={classnames(
                      {active: this.state.activeTabModal === '2'})}
                           onClick={() => {
                             this.toggleTabModal('2');
                           }}><strong>Cập nhật thông tin khách hàng</strong>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={classnames(
                      {active: this.state.activeTabModal === '3'})}
                           onClick={() => {
                             this.toggleTabModal('3');
                           }}><strong>Danh sách hóa đơn</strong>
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
                        <Label htmlFor="text-input">Tên khách hàng</Label>
                        <Input name="nameCustomer" type="text" id="text-input"
                               placeholder="Tên khách hàng"
                               onChange={this.handleChange}
                               required/>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="text-input">Loại khách hàng</Label>
                        <select
                            className="form-control"
                            onChange={(e) => this.setState(
                                {customerType: e.target.value})}>
                          <option value={1}>Hộ gia đình</option>
                          <option value={2}>Doanh nghiệp</option>
                          <option value={3}>Đại lí cấp 1</option>
                          <option value={4}>Đại lí cấp 2</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="6">
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Tổng số lượng</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <Input name="totalAmount" type="text" id="text-input"
                                 placeholder="Tổng số lượng đến hiện tại đã mua"
                                 onChange={this.handleChange} required/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Tổng số điểm tích lũy</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <Input name="totalScore" type="text" id="text-input"
                                 placeholder="Điểm tích lũy khi khách mua gas"
                                 onChange={this.handleChange} required/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Số điện thoại</Label>
                        </Col>
                        <Col xs="12" sm="9" style={{display:'flex'}}>
                          <Input name="phoneCustomer" type="text" id="text-input"
                                 placeholder="Số điện thoại khách hàng"
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
                          <Input name="addressCustomer" type="text" id="text-input"
                                 placeholder="Địa chỉ khách hàng"
                                 onChange={this.handleChange}
                                 required/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Ngày bắt đầu mua</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <DatePicker
                              className="form-control"
                              placeholderText={currentDate}
                              selected={this.state.startDatePurchase}
                              onChange={this.handleChangeStartDate}
                              dateFormat="DD/MM/YYYY"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Ngày mua gần nhất</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <DatePicker
                              className="form-control"
                              placeholderText={currentDate}
                              selected={this.state.lastDatePurchase}
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
                  </Row>
                </TabPane>
                <TabPane tabId="2">
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
                        <Label htmlFor="text-input">Tên khách hàng</Label>
                        <Input name="nameCustomer" type="text" id="text-input"
                               placeholder="Tên khách hàng"
                               onChange={this.handleChange}
                               required/>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="text-input">Loại khách hàng</Label>
                        <select
                            className="form-control"
                            onChange={(e) => this.setState(
                                {customerType: e.target.value})}>
                          <option value={1}>Hộ gia đình</option>
                          <option value={2}>Doanh nghiệp</option>
                          <option value={3}>Đại lí cấp 1</option>
                          <option value={4}>Đại lí cấp 2</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="6">
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Tổng số lượng</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <Input name="totalAmount" type="text" id="text-input"
                                 placeholder="Tổng số lượng đến hiện tại đã mua"
                                 onChange={this.handleChange} required/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Tổng số điểm tích lũy</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <Input name="totalScore" type="text" id="text-input"
                                 placeholder="Điểm tích lũy khi khách mua gas"
                                 onChange={this.handleChange} required/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Số điện thoại</Label>
                        </Col>
                        <Col xs="12" sm="9" style={{display:'flex'}}>
                          <Input name="phoneCustomer" type="text" id="text-input"
                                 placeholder="Số điện thoại khách hàng"
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
                          <Input name="addressCustomer" type="text" id="text-input"
                                 placeholder="Địa chỉ khách hàng"
                                 onChange={this.handleChange}
                                 required/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Ngày bắt đầu mua</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <DatePicker
                              className="form-control"
                              placeholderText={currentDate}
                              selected={this.state.startDatePurchase}
                              onChange={this.handleChangeStartDate}
                              dateFormat="DD/MM/YYYY"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Ngày mua gần nhất</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <DatePicker
                              className="form-control"
                              placeholderText={currentDate}
                              selected={this.state.lastDatePurchase}
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

export default CustomerManagement;