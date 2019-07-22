import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
  Button,
  Col, FormGroup, Input, Label, Modal, ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink, Row,
  TabContent, Table,
  TabPane
} from "reactstrap";
import classnames from "classnames";
import DatePicker from "react-datepicker";
import moment from 'moment';
import {getCurrentUser} from "../../../services/AuthService";
import {toast} from "react-toastify";
import {getAllGasType} from "../../../api/gasType";

let original = "2/11 Bạch đằng, phường 2, Tân Bình";

class ModalMoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalUpdate: false,
      activeTabModal: '1',
      fullName: '',

      gasTypeResult: [],
      elf6kg: 0,
      elf12kg: 0,
      elf39kg: 0,
      b12: 0,
      b45: 0
    };

    this.toggleTabModal = this.toggleTabModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    getCurrentUser().then(res => {
      this.setState({
        fullName: res.data.fullName
      })
    }).catch(err => {
      console.log(err);
      toast.error("get current user fail.")
    });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  toggleModal() {
    this.setState(prevState => ({
      modalUpdate: !prevState.modalUpdate
    }));
    if(this.state.modalUpdate === false) {
      getAllGasType().then(res => {
        this.setState({
          gasTypeResult: res.data.result
        })
      }).catch(err => {
        console.log(err);
        toast.error("Lấy danh sách gas thất bại. Vui lòng thử lại.");
      })
    }
  };

  toggleTabModal(tab) {
    if (this.state.activeTabModal !== tab) {
      this.setState({
        activeTabModal: tab
      });
    }
  }

  render() {
    let currentDate = moment().format('DD/MM/YYYY');
    const fullName = this.state.fullName;
    const gasTypeResult = this.state.gasTypeResult;
    const {customerName, customerType,customerPhone,customerAddress, note} = this.props.customer;
    return (
      <React.Fragment>
        <a className="btn btn-primary"
           style={{width: "100px"}}
            onClick={() => this.toggleModal()}
        >
          {'KH000' + this.props.data}
          <i className="fa fa-user-o" style={{paddingLeft: "7px"}}></i>
        </a>

        <Modal isOpen={this.state.modalUpdate}
               toggle={() => this.toggleModal()}
               className={'modal-lg modal-lg-custom' + this.props.className}
        >
          <ModalHeader toggle={() => this.toggleModal()}>
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
                         }}><strong>Cập nhật thông tin</strong>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames(
                    {active: this.state.activeTabModal === '3'})}
                         onClick={() => {
                           this.toggleTabModal('3');
                         }}><strong>Danh sách mua</strong>
                </NavLink>
              </NavItem>
            </Nav>
          </ModalHeader>
          <TabContent activeTab={this.state.activeTabModal}>
            <TabPane tabId="1">
              <Row>
                <Col xs="12" sm="12" style={{padding: '0 30px'}}>
                  <Row>
                    <Col style={{textAlign: 'center'}}>
                      <h2>GAS HƯNG LỢI HƯNG</h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{textAlign: 'center'}}>
                      <h6>18 Hồng Hà, Nha Trang</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{textAlign: 'center'}}>
                      <h5>Hotline: 0987 323 789</h5>
                    </Col>
                  </Row>
                  <hr/>
                  <Row>
                    <Col style={{textAlign: 'center'}}>
                      <h4>HÓA ĐƠN BÁN HÀNG</h4>
                    </Col>
                  </Row>
                  <Row style={{marginBottom: '20px'}}>
                    <Col style={{textAlign: 'center'}}>
                      <h5>ID: HD440705</h5>
                    </Col>
                  </Row>
                  <Row style={{marginBottom: '10px'}}>
                    <Col xs="12" sm="4">
                      <Row style={{display: 'flex', alignItems: 'center'}}>
                        <Label htmlFor="text-input"
                               style={{marginRight: '10px'}}>
                          <strong>Ngày bán:</strong>
                        </Label>
                        <DatePicker
                            className="form-control"
                            placeholderText={currentDate}
                            selected={this.state.startDatePurchase}
                            onChange={this.handleChangeStartDate}
                            dateFormat="DD/MM/YYYY"
                        />
                      </Row>
                    </Col>
                    <Col xs="12" sm="4">
                      <Row style={{display: 'flex', alignItems: 'center'}}>
                        <Label htmlFor="text-input"><strong>Khách
                          hàng:</strong></Label>
                        <Input type="text" id="text-input"
                               style={{marginLeft: '10px', width: 'auto'}}
                               placeholder="Tên khách hàng"
                               defaultValue={customerName} disabled/>
                      </Row>
                    </Col>
                    <Col xs="12" sm="4">
                      <Row style={{display: 'flex', alignItems: 'center'}}>
                        <Label htmlFor="text-input"><strong>Người
                          bán:</strong></Label>
                        <Input type="text" id="text-input"
                               style={{marginLeft: '10px', width: 'auto'}}
                               placeholder="Người bán"
                               defaultValue={fullName} disabled/>
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{marginBottom: '10px'}}>
                    <Table responsive striped>
                      <thead>
                      <tr>
                        <th>TT</th>
                        <th>Tên hàng</th>
                        <th>SL</th>
                        <th>Đ.Giá</th>
                        <th>T.Tiền</th>
                      </tr>
                      </thead>
                      <tbody>
                      {
                        gasTypeResult ? gasTypeResult.map((item, i) => {
                          return (
                              <tr key={i}>
                                <td>{i+1}</td>
                                <td>{item.gasName}</td>
                                <td>
                                  <Input type="text" style={{maxWidth:'100px'}}
                                         id="text-input" placeholder="SL"
                                         onChange={this.handleChange}
                                  />
                                </td>
                                <td>{item.unitPriceOut}</td>
                                <td>{item.unitPriceOut}</td>
                              </tr>
                          )
                        })
                            : null
                      }
                      </tbody>
                    </Table>
                  </Row>
                  <hr/>
                  <Row style={{
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Col>
                      <Input type="text" id="text-input"
                             className="pull-right"
                             style={{marginLeft: '10px', width: '350px'}}
                             placeholder="Thành tiền"
                             onChange={this.handleChange}
                             readOnly/>
                      <Label htmlFor="text-input"
                             className="pull-right"><strong>Thành
                        tiền:</strong></Label>
                    </Col>
                  </Row>
                  <Row style={{
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Col>
                      <Input name="nameCustomer" type="text" id="text-input"
                             className="pull-right"
                             style={{marginLeft: '10px', width: '350px'}}
                             placeholder="Chiết khấu"
                             onChange={this.handleChange}
                             required/>
                      <Label htmlFor="text-input" className="pull-right">Chiết
                        khấu:</Label>
                    </Col>
                  </Row>
                  <Row style={{
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Col>
                      <Input name="nameCustomer" type="text" id="text-input"
                             className="pull-right"
                             style={{marginLeft: '10px', width: '350px'}}
                             placeholder="Tổng cộng"
                             onChange={this.handleChange}
                             readOnly/>
                      <Label htmlFor="text-input"
                             className="pull-right"><strong>Tổng
                        cộng:</strong></Label>
                    </Col>
                  </Row>
                  <Row style={{marginTop: '20px'}}>
                    <Col>
                      <Button color="success" className="pull-right"
                              style={{marginLeft: '5px'}}>
                        <i className="fa fa-file-pdf-o"></i>{'\u00A0'} Xuất
                        hóa đơn
                      </Button>
                      <Button color="warning" className="pull-right">
                        <i className="fa fa-plus"/> Lưu hóa đơn
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col xs="12" sm="6" style={{paddingLeft: '30px'}}>
                  <FormGroup row>
                    <Col xs="12" sm="3">
                      <Label htmlFor="text-input">Số điện thoại</Label>
                    </Col>
                    <Col xs="12" sm="9" style={{display: 'flex'}}>
                      <Input name="phoneCustomer" type="text" id="text-input"
                             placeholder="Số điện thoại khách hàng"
                             className="input-content"
                             value={customerPhone}
                             style={{width: '90%'}}
                             onChange={this.handleChange} required/>
                      <Button type="submit" color="success"
                              style={{marginLeft: '10px'}}
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
                             className="input-content"
                             value={customerAddress}
                             onChange={this.handleChange}
                             required/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" sm="3">
                      <Label htmlFor="text-input">Ghi chú</Label>
                    </Col>
                    <Col xs="12" sm="9">
                      <Input name="note" type="text" id="text-input"
                             placeholder="Ghi chú tại đây"
                             className="input-content"
                             value={note}
                             onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6" style={{paddingRight: '30px'}}>
                  <FormGroup>
                    <Label htmlFor="text-input">Tên khách hàng</Label>
                    <Input name="nameCustomer" type="text" id="text-input"
                           placeholder="Tên khách hàng"
                           className="input-content"
                           value={customerName}
                           onChange={this.handleChange}
                           required/>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="text-input">Loại khách hàng</Label>
                    <Input name="customerType" type="text" id="text-input"
                           placeholder="Loại khách hàng"
                           className="input-content"
                           value={customerType}
                           onChange={this.handleChange}/>
                  </FormGroup>
                  <Button color="primary" className="pull-right">
                    Cập nhật
                  </Button>
                </Col>
              </Row>

            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col xs="12" sm="12" style={{padding: '0 30px'}}>
                  <Row><h4>Khách hàng: </h4></Row>
                  <Row>
                    <Table responsive striped>
                      <thead>
                      <tr>
                        <th>TT</th>
                        <th>Ngày bán</th>
                        <th>Người bán</th>
                        <th>Tên hàng</th>
                        <th>SL</th>
                        <th>Đ.Giá</th>
                        <th>T.Tiền</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                      </tr>
                      </tbody>
                    </Table>
                  </Row>
                  <hr/>
                  <Row style={{
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Label htmlFor="text-input">Tổng cộng:</Label>
                    <Input name="nameCustomer" type="text" id="text-input"
                           style={{marginLeft: '15px', width: 'auto'}}
                           placeholder="Tổng cộng"
                           onChange={this.handleChange}
                           readOnly/>
                  </Row>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
          <ModalFooter>
            <Button color="secondary"
                    onClick={() => this.toggleModal()}>Đóng</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}


function formatColAddress (cell, row) {
  return (
      <a href={"https://www.google.com/maps/dir/?api=1&origin="+original+"&destination="+`${cell}`+"&travelmode=driving"}
         target="_blank"
      >
        {cell}
      </a>
  )
}

function formatColId(cell, row, enumObject, index) {
  return (
      <ModalMoreInfo data={cell} customer={row}/>
  )
}

class TableCustomer extends Component {
  constructor(props) {
    super(props);

    this.state={
      listAllCustomer: []
    }
  }

  createCustomClearButton = (onClick) => {
    return (
        <button className='btn btn-secondary' onClick={ onClick }>Clear</button>
    );
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      listAllCustomer: nextProps.data
    })
  }

  render() {
    const options = {
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton,
      expandRowBgColor: 'rgb(242, 255, 163)'
    };

    const selectRow = {
      mode: 'checkbox',
      bgColor: 'rgb(238, 193, 213)'
    };

    const customers = [];
    this.state.listAllCustomer.map((i, index) => {
      customers.push({
        tt: index+1,
        id: i.id,
        customerName: i.customerName,
        customerType: i.customerType,
        customerPhone: i.customerPhone,
        customerAddress: i.customerAddress,
        startDateBuy: i.startDateBuy,
        lastPurchaseDate: i.lastPurchaseDate,
        totalPurchase: i.totalPurchase,
        totalScore: i.totalScore,
        note: i.note,
      })
    });

    return (
        <BootstrapTable
            className="expand-table"
            data={ customers }
            options={options}
            headerStyle={{backgroundColor:'#78c3f1'}}
            selectRow={ selectRow }
            pagination striped hover condensed
            bodyStyle={{overflow: 'overlay'}}
            search deleteRow exportCSV>
          <TableHeaderColumn width='70' dataField='tt'>STT</TableHeaderColumn>
          <TableHeaderColumn width='150' dataFormat={formatColId}
                             dataField='id' isKey>ID Khách hàng</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='customerName'>Tên Khách hàng</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='customerType'>Loại Khách hàng</TableHeaderColumn>
          <TableHeaderColumn width='120' dataField='customerPhone'>Số điện thoại</TableHeaderColumn>
          <TableHeaderColumn width='150' dataFormat={formatColAddress} dataField='customerAddress'>Địa chỉ</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='startDateBuy'>Ngày bắt đầu mua</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='lastPurchaseDate'>Ngày mua gần nhất</TableHeaderColumn>
          <TableHeaderColumn width='100' dataField='totalPurchase'>Tổng số mua</TableHeaderColumn>
          <TableHeaderColumn width='100' dataField='totalScore'>Tổng điểm</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='note'>Ghi chú</TableHeaderColumn>
        </BootstrapTable>
    );
  }
}

export default TableCustomer;