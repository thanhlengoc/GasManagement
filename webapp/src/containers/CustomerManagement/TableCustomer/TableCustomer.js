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
import {
  createNewInvoice,
  exportInvoice,
  getListInvoice
} from "../../../api/invoiceApi";
import {updateCustomerInfo} from "../../../api/customerapi";
import "../../../../scss/_custom.scss";
import NumberFormat from "react-number-format";

let original = "233 Dương Vân Nga, Phường Vĩnh Hải, Thành phố Nha Trang, Tỉnh Khánh Hòa";

class ModalMoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalUpdate: false,
      activeTabModal: '1',
      fullName: '',

      newInvoiceRequest: {
        userSale: '',
        dateOut: '',
        customerPurchase: '',
        discount: '',
        elf6kg: 0,
        elf12kg: 0,
        elf39kg: 0,
        b12: 0,
        b45: 0,
        other: '',
        unit: '',
        regainElf6kg: '',
        regainElf12kg: '',
        regainElf39kg: '',
        regainB12: '',
        regainB45: '',
        oil: 0,
        sugar: 0,
        glass: 0,
        totalMoney: 0,
        payment: "",
        debtMoneyCus: "",
        debtElf6kgCus: 0,
        debtElf12kgCus: 0,
        debtElf39kgCus: 0,
        debtB12Cus: 0,
        debtB45Cus: 0,
        note: 0,
      },
      gasTypeResult: [],

      updateCustomerRequest: {
        cusId: 0,
        cusName: "",
        cusType: "",
        cusPhone: "",
        cusAddress: "",
        startBuy: "",
        lastBuy: "",
        note: ""
      },

      listInvoiceOfCustomer: [],
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

    if(parseInt(this.state.activeTabModal) === 3) {
      getListInvoice(parseInt(this.props.customer.id)).then(res => {
        if (parseInt(res.data.returnCode) === 1) {
          this.setState({
            listInvoiceOfCustomer: res.data.result
          })
        }
        else {
          toast.error(res.data.returnMessage);
        }
      }).catch(err => {
        console.log(err);
        toast.error("Không có kết quả. Vui lòng thử lại.");
      })
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  toggleModal() {
    this.setState(prevState => ({
      modalUpdate: !prevState.modalUpdate
    }));
    if (this.state.modalUpdate === false) {
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

  handleCreateNewInvoice = () => {
    const {
      dateOut, userSale, customerPurchase, discount, elf6kg, elf12kg, elf39kg, b12, b45, other, unit, regainElf6kg,
      regainElf12kg, regainElf39kg, regainB12, regainB45, oil, sugar, glass, totalMoney, payment, debtMoneyCus,
      debtElf6kgCus, debtElf12kgCus, debtElf39kgCus, debtB12Cus, debtB45Cus, note
    } = this.state.newInvoiceRequest;

    const request = {
      dateOut: dateOut ? dateOut : moment().format("DD/MM/YYYY"),
      userSale: userSale,
      customerPurchase: customerPurchase,
      discount: discount ? discount : 0,
      elf6kg: elf6kg ? elf6kg : 0,
      elf12kg: elf12kg ? elf12kg : 0,
      elf39kg: elf39kg ? elf39kg : 0,
      b12: b12 ? b12 : 0,
      b45: b45 ? b45 : 0,
      other: other ? other : '',
      unit: "",
      regainElf6kg: regainElf6kg ? regainElf6kg : 0,
      regainElf12kg: regainElf12kg ? regainElf12kg : 0,
      regainElf39kg: regainElf39kg ? regainElf39kg : 0,
      regainB12: regainB12 ? regainB12 : 0,
      regainB45: regainB45 ? regainB45 : 0,
      oil: oil ? oil : 0,
      sugar: sugar ? sugar : 0,
      glass: glass ? glass : 0,
      totalMoney: totalMoney ? totalMoney : 0,
      payment: payment ? payment : 0,
      debtMoneyCus: debtMoneyCus ? debtMoneyCus : 0,
      debtElf6kgCus: debtElf6kgCus ? debtElf6kgCus : 0,
      debtElf12kgCus: debtElf12kgCus ? debtElf12kgCus : 0,
      debtElf39kgCus: debtElf39kgCus ? debtElf39kgCus : 0,
      debtB12Cus: debtB12Cus ? debtB12Cus : 0,
      debtB45Cus: debtB45Cus ? debtB45Cus : 0,
      note: note ? note : ''
    };

    createNewInvoice(request).then(res => {
      if (parseInt(res.data.returnCode) === 0) {
        toast.error(res.data.returnMessage);
      }
      else {
        toast.success(res.data.returnMessage);
        this.handleExportInvoice(res.data.result);
      }
    })
    .catch(err => {
      console.log(err);
      toast.error("Không có phản hồi. Vui lòng thử lại sau.");
    })
  };

  handleExportInvoice = (param) => {
    if (param) {
      let window = window.open(exportInvoice(param), '_blank');
      window.focus();
    }
  };

  handleUpdateCustomerInfo = () => {
    const {cusId, cusName, cusType, cusPhone, cusAddress, startBuy, lastBuy, note} = this.state.updateCustomerRequest;
    let currentDate = moment().format('DD/MM/YYYY');

    const request = {
      cusId : cusId ? cusId : 0,
      cusName: cusName,
      cusType: cusType,
      cusPhone: cusPhone,
      cusAddress: cusAddress,
      startBuy: startBuy ? startBuy : currentDate,
      lastBuy: lastBuy ? lastBuy : currentDate,
      note: note
    };

    updateCustomerInfo(request).then(res => {
      if(parseInt(res.data.returnCode) === 1) {
        toast.success(res.data.returnMessage);
      }
      else {
        toast.error(res.data.returnMessage);
      }
    }).catch(err => {
      console.log(err);
      toast.error("Không có phản hồi. Vui lòng thử lại sau.");
    })
  };

  render() {
    let currentDate = moment().format('DD/MM/YYYY');
    const fullName = this.state.fullName;
    const gasTypeResult = this.state.gasTypeResult;
    const listInvoiceOfCustomer = this.state.listInvoiceOfCustomer;
    const {id, customerName, customerType, customerPhone, customerAddress, note} = this.props.customer;

    const selectRow = {
      mode: 'checkbox',
      bgColor: 'rgb(238, 193, 213)'
    };

    const options = {
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton,
      sortIndicator: true,
      hideSizePerPage: true,
    };

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
                 style={{maxWidth: "90%"}}
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
                <form id="form-create-invoice">
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
                                <td>{i + 1}</td>
                                <td>{item.gasName}</td>
                                <td>
                                  <Input type="text"
                                         style={{maxWidth: '100px'}}
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
                                onClick={()=>this.handleCreateNewInvoice()}
                        >
                          <i className="fa fa-file-pdf-o"></i>{'\u00A0'} Xuất
                          hóa đơn
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                </form>
              </TabPane>
              <TabPane tabId="2">
                <Row className="row justify-content-center">
                  <Col xs="12" sm="5">
                    <FormGroup row>
                      <Col xs="12" sm="3">
                        <Label htmlFor="text-input">Số điện thoại</Label>
                      </Col>
                      <Col xs="12" sm="9" style={{display: 'flex'}}>
                        <Input name="phoneCustomer" type="text" id="text-input"
                               placeholder="Số điện thoại khách hàng"
                               className="input-content"
                               value={customerPhone}
                               onChange={this.handleChange} required/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col xs="12" sm="3">
                        <Label htmlFor="text-input">Địa chỉ</Label>
                      </Col>
                      <Col xs="12" sm="9">
                        <Input name="addressCustomer" type="text"
                               id="text-input"
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
                  <Col xs="12" sm="5">
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
                    <Button color="info" className="pull-right"
                            onClick={()=>this.handleUpdateCustomerInfo()}
                    >
                      Cập nhật
                    </Button>
                  </Col>
                </Row>

              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col xs="12" sm="12" style={{padding: '0 20px'}}>
                    <Row className="row justify-content-center"
                         style={{padding:'20px 0'}}
                    >
                      <h3>Khách hàng: {customerName}</h3>
                    </Row>
                    <BootstrapTable
                        data={ listInvoiceOfCustomer } version="4"
                        options={options}
                        selectRow={ selectRow }
                        pagination striped hover condensed
                        bodyStyle={{overflow: 'overlay'}}
                        search deleteRow exportCSV>
                      <TableHeaderColumn row='0' rowSpan='3' width='50' dataField='id' isKey dataSort>ID</TableHeaderColumn>

                      <TableHeaderColumn row='0' rowSpan='3' width='150' dataField='date'>Ngày Nhập</TableHeaderColumn>
                      <TableHeaderColumn row='0' rowSpan='3' width='150' dataField='customer'>Khách hàng</TableHeaderColumn>

                      <TableHeaderColumn row='0' colSpan='9' csvHeader='Số lượng và giá bán theo loại'
                                         headerAlign='center'>Số lượng và giá bán theo loại</TableHeaderColumn>

                      <TableHeaderColumn row='1' colSpan='3' csvHeader='Elf Gas'
                                         headerAlign='center'>Elf Gas</TableHeaderColumn>
                      <TableHeaderColumn row='2' dataField='elf6kg' width='100' dataAlign='center' dataSort>Elf 6kg</TableHeaderColumn>
                      <TableHeaderColumn row='2' dataField='elf12kg' width='100' dataSort>Elf 12kg</TableHeaderColumn>
                      <TableHeaderColumn row='2' dataField='elf39kg' width='100' dataSort>Elf 39kg</TableHeaderColumn>

                      <TableHeaderColumn row='1' colSpan='2' csvHeader='PM'
                                         headerAlign='center'>PM</TableHeaderColumn>
                      <TableHeaderColumn row='2' dataField='b12' width='90' dataSort>B12</TableHeaderColumn>
                      <TableHeaderColumn row='2' dataField='b45' width='90' dataSort>B45</TableHeaderColumn>

                      <TableHeaderColumn row='1' rowSpan='2' dataField='other' width='150'>Khác</TableHeaderColumn>
                      <TableHeaderColumn row='1' rowSpan='2' dataField='unit' width='150'>Đơn vị</TableHeaderColumn>

                      <TableHeaderColumn row='1' colSpan='2' csvHeader='Thu Vỏ'
                                         headerAlign='center'>Thu Vỏ</TableHeaderColumn>
                      <TableHeaderColumn row='2' dataField='regainB12' width='70' dataSort>B12</TableHeaderColumn>
                      <TableHeaderColumn row='2' dataField='regainB45' width='70' dataSort>B45</TableHeaderColumn>

                      <TableHeaderColumn row='0' colSpan='3' csvHeader='Xuất Khuyến mãi'
                                         headerAlign='center'>Nhập Khuyến mãi</TableHeaderColumn>
                      <TableHeaderColumn row='1' rowSpan='2' dataField='oil' width='80' dataSort>Dầu</TableHeaderColumn>
                      <TableHeaderColumn row='1' rowSpan='2' dataField='sugar' width='90' dataSort>Đường</TableHeaderColumn>
                      <TableHeaderColumn row='1' rowSpan='2' dataField='glass' width='80' dataSort>Ly</TableHeaderColumn>

                      <TableHeaderColumn row='0' rowSpan='3' width='150' dataField='totalMoney'>Thành tiền</TableHeaderColumn>
                      <TableHeaderColumn row='0' rowSpan='3' width='150' dataField='payment'>Trả tiền</TableHeaderColumn>

                      <TableHeaderColumn row='0' colSpan='6' csvHeader='Khách hàng nợ'
                                         headerAlign='center'>Khách hàng nợ</TableHeaderColumn>
                      <TableHeaderColumn row='1' rowSpan='2' dataField='debtMoney' width='120' dataSort>Tiền</TableHeaderColumn>
                      <TableHeaderColumn row='1' rowSpan='2' dataField='debtElf6kg' width='120' dataSort>Vỏ Elf 6kg</TableHeaderColumn>
                      <TableHeaderColumn row='1' rowSpan='2' dataField='debtElf12kg' width='120' dataSort>Vỏ Elf 12kg</TableHeaderColumn>
                      <TableHeaderColumn row='1' rowSpan='2' dataField='debtElf39kg' width='120' dataSort>Vỏ Elf 39kg</TableHeaderColumn>
                      <TableHeaderColumn row='1' rowSpan='2' dataField='debtB12' width='100' dataSort>Vỏ B12</TableHeaderColumn>
                      <TableHeaderColumn row='1' rowSpan='2' dataField='debtB45' width='100' dataSort>Vỏ B45</TableHeaderColumn>
                    </BootstrapTable>
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
                             defaultValue={''}
                             readOnly/>
                    </Row>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
            <ModalFooter>
              <Button color="danger"
                      onClick={() => this.toggleModal()}>Đóng</Button>
            </ModalFooter>
          </Modal>
        </React.Fragment>
    )
  }
}

function formatColAddress(cell, row) {
  return (
      <a href={"https://www.google.com/maps/dir/?api=1&origin=" + original
      + "&destination=" + `${cell}` + "&travelmode=driving"}
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

    this.state = {
      listAllCustomer: []
    }
  }

  createCustomClearButton = (onClick) => {
    return (
        <button className='btn btn-secondary' onClick={onClick}>Clear</button>
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
      sortIndicator: true,
      hideSizePerPage: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    };

    const selectRow = {
      mode: 'checkbox',
      bgColor: 'rgb(238, 193, 213)'
    };

    const customers = [];
    this.state.listAllCustomer.map((i, index) => {
      customers.push({
        tt: index + 1,
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
            className="expand-table" version="4"
            data={customers}
            options={options}
            selectRow={selectRow}
            pagination striped hover condensed
            bodyStyle={{overflow: 'overlay'}}
            search deleteRow exportCSV>
          <TableHeaderColumn width='70' dataField='tt'
                             dataSort>STT</TableHeaderColumn>
          <TableHeaderColumn width='150' dataFormat={formatColId}
                             dataField='id' isKey dataSort>ID Khách
            hàng</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='customerName'>Tên Khách
            hàng</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='customerType'>Loại Khách
            hàng</TableHeaderColumn>
          <TableHeaderColumn width='120' dataField='customerPhone'>Số điện
            thoại</TableHeaderColumn>
          <TableHeaderColumn width='150' dataFormat={formatColAddress}
                             dataField='customerAddress'>Địa
            chỉ</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='startDateBuy'>Ngày bắt đầu
            mua</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='lastPurchaseDate'>Ngày mua
            gần nhất</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='totalPurchase' dataSort>Tổng
            số mua</TableHeaderColumn>
          <TableHeaderColumn width='100' dataField='totalScore' dataSort>Tổng
            điểm</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='note'>Ghi
            chú</TableHeaderColumn>
        </BootstrapTable>
    );
  }
}

export default TableCustomer;