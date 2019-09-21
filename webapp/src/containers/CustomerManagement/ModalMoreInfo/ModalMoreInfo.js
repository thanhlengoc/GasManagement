import React, {Component} from "react";
import {getCurrentUser} from "../../../services/AuthService";
import {toast} from "react-toastify";
import {createNewInvoice, getListInvoice} from "../../../api/invoiceApi";
import moment from "moment";
import {updateCustomerInfo} from "../../../api/customerapi";
import {
  Button,
  Col, FormGroup, Input, Label,
  Modal, ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink, Row,
  TabContent, Table, TabPane
} from "reactstrap";
import Loading from "../../../components/Loading";
import classnames from "classnames";
import DatePicker from "react-datepicker";
import NumberFormat from "react-number-format";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

class ModalMoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalUpdate: false,
      activeTabModal: '1',
      fullName: '',

      userSale: '',
      dateInvoice: new Date(),
      customerPurchase: '',
      discount: '',
      elf6kg: 0, priceElf6: 0, totalMoneyElf6: 0,
      elf12kg: 0, priceElf12: 0, totalMoneyElf12: 0,
      elf39kg: 0, priceElf39: 0, totalMoneyElf39: 0,
      b12: 0, priceB12: 0, totalMoneyB12: 0,
      b45: 0, priceB45: 0, totalMoneyB45: 0,
      total12: 0, priceTotal12: 0, totalTotal12: 0,
      otherFee: 0, otherFeeContent: "",
      regainElf6kg: 0, regainElf12kg: 0, regainElf39kg: 0, regainB12: 0, regainB45: 0,
      regainTotal12: 0,
      oil: 0, sugar: 0, glass: 0,
      payment: "",
      noteInvoice: "",
      valve: 0, priceValve: 0,
      stove: 0, priceStove: 0,
      torch: 0, priceTorch: 0,
      cusId: 0,
      cusName: "",
      cusType: "",
      cusPhone: "",
      cusAddress: "",
      startBuy: "",
      lastBuy: "",
      note: "",

      listInvoiceOfCustomer: [],
      amount: 0,
      unitPriceOut: 0,

      loading: false
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

  handleChangeInvoiceDate = (date) => {
    this.setState({
      dateInvoice: date
    })
  };

  toggleModal() {
    this.setState(prevState => ({
      modalUpdate: !prevState.modalUpdate
    }));
  };

  toggleTabModal(tab) {
    if (this.state.activeTabModal !== tab) {
      this.setState({
        activeTabModal: tab
      }, () => {
        if(this.state.activeTabModal === '3') {
          this.setState({loading:true});
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
          }).finally(()=>{this.setState({loading:false})})
        }
      });
    }
  }

  handleCreateNewInvoice = () => {
    this.setState({loading: true});

    const {
      dateInvoice, fullName, discount, elf6kg, elf12kg, elf39kg, b12, b45, total12, otherFee, otherFeeContent, regainElf6kg,
      regainElf12kg, regainElf39kg, regainB12, regainB45, oil, sugar, glass, payment, noteInvoice,
      priceElf6, priceElf12, priceElf39, priceB12, priceB45, priceTotal12, valve, stove, torch,
        priceValve, priceStove, priceTorch, regainTotal12
    } = this.state;
    let {cusID} = this.props;

    const request = {
      dateOut: moment(dateInvoice).format("DD/MM/YYYY HH:mm:ss"),
      userSale: fullName,
      customerPurchase: cusID,
      discount: discount,
      elf6kg: elf6kg,
      elf12kg: elf12kg,
      elf39kg: elf39kg,
      b12: b12,
      b45: b45,
      total12: total12,
      valve: valve,
      stove: stove,
      torch: torch,
      priceValve: priceValve,
      priceStove: priceStove,
      priceTorch: priceTorch,
      priceElf6: priceElf6,
      priceElf12: priceElf12,
      priceElf39: priceElf39,
      priceB12: priceB12,
      priceB45: priceB45,
      priceTotal12: priceTotal12,
      otherFee: otherFee,
      otherFeeContent: otherFeeContent,
      regainElf6kg: regainElf6kg,
      regainElf12kg: regainElf12kg,
      regainElf39kg: regainElf39kg,
      regainB12: regainB12,
      regainB45: regainB45,
      regainTotal12: regainTotal12,
      promotion: {
        oil: oil,
        sugar: sugar,
        glass: glass,
      },
      payment: payment,
      note: noteInvoice ? noteInvoice : ''
    };

    createNewInvoice(request).then(res => {
      if (res && parseInt(res.data.returnCode) === 1) {
        toast.success(res.data.returnMessage);
        this.handleExportInvoice(res.data.result);
        this.toggleModal();
      }
      else {
        toast.error("Không có dữ liệu trả về.");
      }
    })
    .catch(err => {
      console.log(err);
      toast.error("Không có phản hồi. Vui lòng thử lại sau.");
    }).finally(()=>{
      this.setState({loading: false})
    })
  };

  handleExportInvoice = (billId) => {
    if (billId) {
      // let params = "";
      // Object.keys(requestParam).map(i => params += i + '=' + requestParam[i] + '&');
      let domain = "http://localhost:8082/";
      let url = domain + "api/bill/export-invoice?billId=" + billId;
      // let url = "api/bill/export-invoice?billId=" + billId;
      console.log("url xuat hoa don: "+url);
      window.open(url, '_blank');
    }
  };

  handleUpdateCustomerInfo = () => {
    const {cusName, cusType, cusPhone, cusAddress, lastBuy} = this.state;
    let {cusID} = this.props;
    const {customerName, customerType, customerPhone, customerAddress, note} = this.props.customer;
    let currentDate = moment().format('DD/MM/YYYY');

    const request = {
      cusId : cusID ? cusID : 0,
      cusName: cusName !== "" ? cusName : customerName,
      cusType: cusType !== "" ? cusType : customerType,
      cusPhone: cusPhone !== "" ? cusPhone : customerPhone,
      cusAddress: cusAddress !== "" ? cusAddress : customerAddress,
      lastBuy: lastBuy ? lastBuy : currentDate,
      note: this.state.note !== "" ? this.state.note : note
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
    }).finally(()=>{
      this.setState({
        modalUpdate: !this.state.modalUpdate
      })
    })
  };

  render() {
    let currentDate = moment().format('DD/MM/YYYY');
    const {fullName, totalMoneyElf6, totalMoneyElf12, totalMoneyElf39,
      totalMoneyB12, totalMoneyB45, totalTotal12, otherFee, discount} = this.state;
    const listInvoiceOfCustomer = this.state.listInvoiceOfCustomer;
    const {customerName, customerType, customerPhone, customerAddress, note} = this.props.customer;
    let {cusID} = this.props;

    let totalMoney= totalMoneyElf6 + totalMoneyElf12 + totalMoneyElf39 +
        totalMoneyB12 + totalMoneyB45 + totalTotal12 + otherFee;
    let totalMoneyAfterDiscount= totalMoney - totalMoney*discount;

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
            {'KH000' + cusID}
            <i className="fa fa-user-o" style={{paddingLeft: "7px"}}></i>
          </a>
          <Modal isOpen={this.state.modalUpdate}
                 toggle={() => this.toggleModal()}
                 className={'modal-lg modal-lg-custom' + this.props.className}
                 style={{maxWidth: "90%"}}
          >
            {
              this.state.loading ? <Loading/> : null
            }
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
                      <Row className="row justify-content-center">
                        <Col style={{textAlign: 'center'}}>
                          <h2>GAS HƯNG LỢI HƯNG</h2>
                        </Col>
                      </Row>
                      <Row>
                        <Col style={{textAlign: 'center'}}>
                          <h6>233 Dương Vân Nga, Phường Vĩnh Hải, Thành phố Nha Trang, Tỉnh Khánh Hòa</h6>
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
                          <h5>HĐ Số: HD440705</h5>
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
                                selected={this.state.dateInvoice}
                                onChange={this.handleChangeInvoiceDate}
                                dateFormat="dd/MM/yyyy"
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
                        <Table responsive striped bordered className="table-header">
                          <thead>
                          <tr>
                            <th>Elf 6KG</th>
                            <th>Elf 12KG</th>
                            <th>Elf 39KG</th>
                            <th>B12</th>
                            <th>B45</th>
                            <th>Total12</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                            <td>
                              <Input type="number" name="elf6kg"
                                     style={{marginBottom:"10px"}}
                                     placeholder="Số lượng"
                                     onChange={(e)=>this.setState({
                                           elf6kg:e.target.value
                                         },()=>{
                                           this.setState({
                                             totalMoneyElf6: this.state.elf6kg*parseInt(this.state.priceElf6)
                                           })
                                         }
                                     )}
                              />
                              <NumberFormat thousandSeparator={true}
                                            style={{marginBottom:"10px"}}
                                            name="priceElf6"
                                            placeholder="Nhập đơn giá bán"
                                            onChange={(e)=>this.setState({
                                                  priceElf6:e.target.value
                                                },()=>{
                                                  this.setState({
                                                    totalMoneyElf6: this.state.elf6kg*parseInt(this.state.priceElf6)
                                                  })
                                                }
                                            )}
                              />
                              <Input type="text" value={"VND " + this.state.totalMoneyElf6 + ",000"} readOnly/>
                            </td>
                            <td>
                              <Input type="number" name="elf12kg"
                                     style={{marginBottom:"10px"}}
                                     placeholder="Số lượng"
                                     onChange={(e)=>this.setState({
                                       elf12kg:e.target.value
                                     },()=>{
                                       this.setState({totalMoneyElf12:this.state.elf12kg*parseInt(this.state.priceElf12)})})}
                              />
                              <NumberFormat thousandSeparator={true}
                                            style={{marginBottom:"10px"}}
                                            name="priceElf12"
                                            placeholder="Nhập đơn giá bán"
                                            onChange={(e)=>this.setState({
                                              priceElf12:e.target.value
                                            },()=>{
                                              this.setState({totalMoneyElf12:this.state.elf12kg*parseInt(this.state.priceElf12)})})}
                              />
                              <Input type="text" value={"VND "+this.state.totalMoneyElf12+",000"} readOnly/>
                            </td>
                            <td>
                              <Input type="number" name="elf39kg"
                                     style={{marginBottom:"10px"}}
                                     placeholder="Số lượng"
                                     onChange={(e)=>this.setState({
                                       elf39kg:e.target.value
                                     },()=>{
                                       this.setState({totalMoneyElf39:this.state.elf39kg*parseInt(this.state.priceElf39)})
                                     })}
                              />
                              <NumberFormat thousandSeparator={true}
                                            style={{marginBottom:"10px"}}
                                            name="priceElf39"
                                            placeholder="Nhập đơn giá bán"
                                            onChange={(e)=>this.setState({
                                              priceElf39:e.target.value
                                            },()=>{
                                              this.setState({totalMoneyElf39:this.state.elf39kg*parseInt(this.state.priceElf39)})
                                            })}
                              />
                              <Input type="text" value={"VND "+this.state.totalMoneyElf39+",000"} readOnly/>
                            </td>
                            <td>
                              <Input type="number" name="b12"
                                     style={{marginBottom:"10px"}}
                                     placeholder="Số lượng"
                                     onChange={(e)=>this.setState({
                                       b12:e.target.value
                                     },()=>{
                                       this.setState({totalMoneyB12:this.state.b12*parseInt(this.state.priceB12)})
                                     })}
                              />
                              <NumberFormat thousandSeparator={true}
                                            style={{marginBottom:"10px"}}
                                            name="priceB12"
                                            placeholder="Nhập đơn giá bán"
                                            onChange={(e)=>this.setState({
                                              priceB12:e.target.value
                                            },()=>{
                                              this.setState({totalMoneyB12:this.state.b12*parseInt(this.state.priceB12)})
                                            })}
                              />
                              <Input type="text" value={"VND "+this.state.totalMoneyB12+",000"} readOnly/>
                            </td>
                            <td>
                              <Input type="number" name="b45"
                                     style={{marginBottom:"10px"}}
                                     placeholder="Số lượng"
                                     onChange={(e)=>this.setState({
                                       b45:e.target.value
                                     },()=>{
                                       this.setState({totalMoneyB45:this.state.b45*parseInt(this.state.priceB45)})
                                     })}
                              />
                              <NumberFormat thousandSeparator={true}
                                            style={{marginBottom:"10px"}}
                                            name="priceB45"
                                            placeholder="Nhập đơn giá bán"
                                            onChange={(e)=>this.setState({
                                              priceB45:e.target.value
                                            },()=>{
                                              this.setState({totalMoneyB45:this.state.b45*parseInt(this.state.priceB45)})
                                            })}
                              />
                              <Input type="text" value={"VND "+this.state.totalMoneyB45+",000"} readOnly/>
                            </td>
                            <td>
                              <Input type="number" name="total12"
                                     style={{marginBottom:"10px"}}
                                     placeholder="Số lượng"
                                     onChange={(e)=>this.setState({
                                       total12:e.target.value},()=>{
                                       this.setState({totalTotal12:this.state.total12*parseInt(this.state.priceTotal12)})
                                     })}
                              />
                              <NumberFormat thousandSeparator={true}
                                            style={{marginBottom:"10px"}}
                                            name="priceTotal12"
                                            placeholder="Nhập đơn giá bán"
                                            onChange={(e)=>this.setState({
                                              priceTotal12:e.target.value},()=>{
                                              this.setState({totalTotal12:this.state.total12*parseInt(this.state.priceTotal12)})
                                            })}
                              />
                              <Input type="text" value={"VND "+this.state.totalTotal12+",000"} readOnly/>
                            </td>
                          </tr>
                          </tbody>
                        </Table>
                      </Row>
                      <Row style={{marginBottom:'10px'}}>
                        <Col md={4}>
                          <Label htmlFor="text-input">
                            <strong>Van:</strong>
                          </Label>
                          <Input name="valve" type="number"
                                 placeholder="Số lượng"
                                 style={{marginBottom:'5px'}}
                                 onChange={this.handleChange}/>
                          <Input name="priceValve" type="number"
                                 placeholder="Giá"
                                 onChange={this.handleChange}/>
                        </Col>
                        <Col md={4}>
                          <Label htmlFor="text-input">
                            <strong>Bếp Gia Đình:</strong>
                          </Label>
                          <Input name="stove" type="number"
                                 placeholder="Số lượng"
                                 style={{marginBottom:'5px'}}
                                 onChange={this.handleChange}/>
                          <Input name="priceStove" type="number"
                                 placeholder="Giá"
                                 onChange={this.handleChange}/>
                        </Col>
                        <Col md={4}>
                          <Label htmlFor="text-input">
                            <strong>Bếp khò:</strong>
                          </Label>
                          <Input name="torch" type="number"
                                 placeholder="Số lượng"
                                 style={{marginBottom:'5px'}}
                                 onChange={this.handleChange}/>
                          <Input name="priceTorch" type="number"
                                 placeholder="Giá"
                                 onChange={this.handleChange}/>
                        </Col>
                      </Row>
                      <Row style={{marginBottom:'10px'}}>
                        <h4>Khách hàng Trả vỏ</h4>
                      </Row>
                      <Row style={{marginBottom:'10px'}}>
                        <Table responsive striped bordered className="table-header">
                          <thead>
                          <tr>
                            <th>Elf 6KG</th>
                            <th>Elf 12KG</th>
                            <th>Elf 39KG</th>
                            <th>B12</th>
                            <th>B45</th>
                            <th>Total12</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                            <td>
                              <Input type="number" name="regainElf6kg"
                                     placeholder="Số lượng"
                                     onChange={this.handleChange}
                              />
                            </td>
                            <td>
                              <Input type="number" name="regainElf12kg"
                                     placeholder="Số lượng"
                                     onChange={this.handleChange}
                              />
                            </td>
                            <td>
                              <Input type="number" name="regainElf39kg"
                                     placeholder="Số lượng"
                                     onChange={this.handleChange}
                              />
                            </td>
                            <td>
                              <Input type="number" name="regainB12"
                                     placeholder="Số lượng"
                                     onChange={this.handleChange}
                              />
                            </td>
                            <td>
                              <Input type="number" name="regainB45"
                                     placeholder="Số lượng"
                                     onChange={this.handleChange}
                              />
                            </td>
                            <td>
                              <Input type="text" name="regainTotal12"
                                     placeholder="Số lượng"
                                     onChange={this.handleChange}
                              />
                            </td>
                          </tr>
                          </tbody>
                        </Table>
                      </Row>
                      <Row style={{marginBottom:'10px'}}>
                        <h4>Xuất khuyến mãi</h4>
                      </Row>
                      <Row style={{marginBottom:'10px'}}>
                        <Col md={4}>
                          <Label htmlFor="text-input">Dầu: </Label>
                          <Input type="number" name="oil"
                                 placeholder="Số lượng"
                                 onChange={this.handleChange}
                          />
                        </Col>
                        <Col md={4}>
                          <Label htmlFor="text-input">Đường: </Label>
                          <Input type="number" name="sugar"
                                 placeholder="Số lượng"
                                 onChange={this.handleChange}
                          />
                        </Col>
                        <Col md={4}>
                          <Label>Ly: </Label>
                          <Input type="number" name="glass"
                                 placeholder="Số lượng"
                                 onChange={this.handleChange}
                          />
                        </Col>
                      </Row>
                      <Row style={{marginBottom:'10px'}}>
                        <h4>Chi phí khác</h4>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Input type="textarea" name="otherFeeContent"
                                 placeholder="Nội dung chi phí khác"
                                 onChange={this.handleChange}
                          />
                        </Col>
                        <Col md={6}>
                          <Input type={"number"}
                                 name="otherFee"
                                 placeholder="Số tiền"
                                 onChange={this.handleChange}
                          />
                        </Col>
                      </Row>
                      <hr/>
                      <Row style={{
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <Col>
                          <NumberFormat className="pull-right"
                                        thousandSeparator={true}
                                        prefix={"VND "}
                                        style={{marginLeft: '10px', width: '350px'}}
                                        placeholder="Thành tiền"
                                        value={totalMoneyElf6 + totalMoneyElf12 + totalMoneyElf39 + totalMoneyB12
                                        + totalMoneyB45 + totalTotal12 + otherFee + ",000"}
                                        readOnly
                          />
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
                          <Input name="discount" type="text" id="text-input"
                                 className="pull-right"
                                 style={{marginLeft: '10px', width: '350px'}}
                                 placeholder="Chiết khấu"
                                 onChange={this.handleChange}
                          />
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
                          <NumberFormat className="pull-right"
                                        style={{marginLeft: '10px', width: '350px'}}
                                        prefix={"VND "}
                                        placeholder="Tổng cộng"
                                        thousandSeparator={true}
                                        value={totalMoneyAfterDiscount + ",000"}
                                        readOnly
                          />
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
                            <i className="fa fa-file-pdf-o"></i>{'\u00A0'} Lưu và Xuất
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
                        <Input name="cusPhone" type="text"
                               placeholder="Số điện thoại khách hàng"
                               className="input-content"
                               value={this.state.cusPhone !== "" ? this.state.cusPhone : customerPhone}
                               onChange={this.handleChange}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col xs="12" sm="3">
                        <Label htmlFor="text-input">Địa chỉ</Label>
                      </Col>
                      <Col xs="12" sm="9">
                        <Input name="cusAddress" type="text"
                               placeholder="Địa chỉ khách hàng"
                               className="input-content"
                               value={this.state.cusAddress !== "" ? this.state.cusAddress : customerAddress}
                               onChange={this.handleChange}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col xs="12" sm="3">
                        <Label htmlFor="text-input">Ghi chú</Label>
                      </Col>
                      <Col xs="12" sm="9">
                        <Input name="note" type="text"
                               placeholder="Ghi chú tại đây"
                               className="input-content"
                               value={this.state.note !== "" ? this.state.note : note}
                               onChange={this.handleChange}/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col xs="12" sm="5">
                    <FormGroup>
                      <Label htmlFor="text-input">Tên khách hàng</Label>
                      <Input name="cusName" type="text"
                             placeholder="Tên khách hàng"
                             className="input-content"
                             value={this.state.cusName !== "" ? this.state.cusName : customerName}
                             onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="text-input">Loại khách hàng</Label>
                      <Input name="cusType" type="text"
                             placeholder="Loại khách hàng"
                             className="input-content"
                             value={this.state.cusType !== "" ? this.state.cusType : customerType}
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
                        data={ listInvoiceOfCustomer }
                        className="expand-table"
                        version="4"
                        options={options}
                        headerStyle={{backgroundColor:'#20a8d8'}}
                        pagination striped hover condensed
                        bodyStyle={{overflow: 'overlay'}}
                        search exportCSV>
                      <TableHeaderColumn row='0' rowSpan='3' width='50' dataField='id' isKey dataSort>STT</TableHeaderColumn>

                      <TableHeaderColumn row='0' rowSpan='3' width='150' dataField='dateOut'>Ngày xuất</TableHeaderColumn>
                      <TableHeaderColumn row='0' rowSpan='3' width='150' dataField='userSale'>Người bán</TableHeaderColumn>

                      <TableHeaderColumn row='0' colSpan='8' csvHeader='Xuất bán'
                                         headerAlign='center'>Xuất bán</TableHeaderColumn>

                      <TableHeaderColumn row='1' colSpan='4' csvHeader='Elf Gas'
                                         headerAlign='center'>Elf Gas</TableHeaderColumn>
                      <TableHeaderColumn row='2' dataField='elf6kg' width='100' dataAlign='center' dataSort>Elf 6</TableHeaderColumn>
                      <TableHeaderColumn row='2' dataField='elf12kg' width='100' dataSort>Elf 12</TableHeaderColumn>
                      <TableHeaderColumn row='2' dataField='elf39kg' width='100' dataSort>Elf 39</TableHeaderColumn>
                      <TableHeaderColumn row='2' dataField='total12' width='100' dataSort>Total12</TableHeaderColumn>

                      <TableHeaderColumn row='1' colSpan='2' csvHeader='PM'
                                         headerAlign='center'>PM</TableHeaderColumn>
                      <TableHeaderColumn row='2' dataField='b12' width='90' dataSort>B12</TableHeaderColumn>
                      <TableHeaderColumn row='2' dataField='b45' width='90' dataSort>B45</TableHeaderColumn>

                      <TableHeaderColumn row='1' colSpan='2' csvHeader='Thu Vỏ'
                                         headerAlign='center'>Khách hàng nợ vỏ</TableHeaderColumn>
                      <TableHeaderColumn row='2' dataField='regainB12' width='70' dataSort>B12</TableHeaderColumn>
                      <TableHeaderColumn row='2' dataField='regainB45' width='70' dataSort>B45</TableHeaderColumn>

                      <TableHeaderColumn row='0' colSpan='3' csvHeader='Xuất Khuyến mãi'
                                         headerAlign='center'>Xuất Khuyến mãi</TableHeaderColumn>
                      <TableHeaderColumn row='1' rowSpan='2' dataField='oil' width='80'>Dầu</TableHeaderColumn>
                      <TableHeaderColumn row='1' rowSpan='2' dataField='sugar' width='90'>Đường</TableHeaderColumn>
                      <TableHeaderColumn row='1' rowSpan='2' dataField='glass' width='80'>Ly</TableHeaderColumn>

                      <TableHeaderColumn row='0' colSpan='3' csvHeader='Xuất van bếp'
                                         headerAlign='center'>Xuất Van, Bếp</TableHeaderColumn>
                      <TableHeaderColumn row='1' rowSpan='2' dataField='debtMoney' width='120'>Van</TableHeaderColumn>
                      <TableHeaderColumn row='1' rowSpan='2' dataField='debtB12' width='100'>Bếp GĐ</TableHeaderColumn>
                      <TableHeaderColumn row='1' rowSpan='2' dataField='debtB45' width='100'>Bếp Khò</TableHeaderColumn>
                    </BootstrapTable>
                    <hr/>
                    <Row style={{
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <Label htmlFor="text-input">Tổng cộng:</Label>
                      <Input type="text" id="text-input"
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

export default ModalMoreInfo;