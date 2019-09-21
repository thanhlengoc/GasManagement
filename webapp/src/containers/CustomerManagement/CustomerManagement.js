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
  FormGroup,
  Label, CardFooter,
} from 'reactstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {createNewCustomer, getAllCustomer} from "../../api/customerapi";
import {toast} from "react-toastify";
import TableCustomer from "./TableCustomer";
import Loading from "../../components/Loading";


class CustomerManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      nameCustomer: '',
      phoneCustomer: '',
      addressCustomer: '',
      startDatePurchase: new Date(),
      lastDatePurchase: null,
      customerType: '',
      note: '',
      customer: {},

      listAllCustomer: null,
      returnCode: 0,
      returnMessage: '',
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  toggleCollapse = () => {
    this.setState({collapse: !this.state.collapse});
  };

  onDrop(pictureFiles) {
    this.setState({
      pictures: [].concat(pictureFiles)
    })
  };

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleChangeStartBuy = (date) => {
    this.setState({
      startDatePurchase: date
    }, ()=>console.log("startDatePurchase: "+this.state.startDatePurchase))
  };

  handleChangeLastBuy = (event) => {
    this.setState({
      lastDatePurchase: event.target.value
    })
  };

  componentDidMount() {
    this.handleGetAllCustomer();
  }

  handleGetAllCustomer = () => {
    this.setState({loading: true});
    getAllCustomer().then(res => {
      this.setState({
        listAllCustomer: res.data.result,
      })
    }).catch(err => {
      console.log(err);
      toast.error("Lỗi hệ thống khi lấy danh sách k.hàng.")
    }).finally(()=> {
      this.setState({loading: false})
    })
  };

  handleCreateNewCustomer = () => {
    const {
      nameCustomer, phoneCustomer, addressCustomer, startDatePurchase,
      lastDatePurchase, customerType, note
    } = this.state;
    let currentDate = moment().format('DD/MM/YYYY');

    const request = {
      cusName: nameCustomer,
      cusType: customerType,
      cusPhone: phoneCustomer,
      cusAddress: addressCustomer,
      startBuy: startDatePurchase ? startDatePurchase : currentDate,
      lastBuy: lastDatePurchase ? lastDatePurchase : currentDate,
      note: note
    };
    createNewCustomer(request).then(res => {
      this.setState({
        returnCode: res.data.returnCode,
        returnMessage: res.data.returnMessage
      }, () => toast.success("Thêm khách hàng thành công."))
    }).then(() => {
      this.handleResetForm();
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
      toast.error("Thêm khách hàng thất bại.")
    })
  };

  handleResetForm = () => {
    document.getElementById("form-create-customer").reset();
  };

  render() {
    let currentDate = moment().format('DD/MM/YYYY');
    const {listAllCustomer} = this.state;
    return (
        <div className="animated fadeIn parent-padding">
          {
            this.state.loading ? <Loading/> : null
          }
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-edit"></i><strong>Danh sách khách
                  hàng</strong>
                  <div className="card-actions">
                    <Button className="btn btn-minimize"
                            data-target="#collapseExample"
                            onClick={()=>this.toggleCollapse()}><i
                        className="icon-arrow-up"></i>
                    </Button>
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse} id="collapseExample">
                  <CardBody>
                    <Row style={{marginBottom: '10px'}}>
                      <Col xs="12" sm="12">
                        <TableCustomer data={listAllCustomer}/>
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
                <CardBody>
                <form id="form-create-customer">
                  <Row className="row justify-content-center" style={{padding:'20px 0'}}>
                    <h3><i className="fa fa-plus"/> Thêm khách hàng mới</h3>
                  </Row>
                  <Row className="row justify-content-center" style={{padding:'20px 0'}}>
                    <Col xs="12" sm="5">
                      <FormGroup>
                        <Label htmlFor="text-input">Tên khách hàng</Label>
                        <Input name="nameCustomer" type="text" id="nameCustomer"
                               placeholder="Tên khách hàng"
                               onChange={this.handleChange}
                               required/>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="text-input">Loại khách hàng</Label>
                        <Input name="customerType" type="text" id="customerType"
                               placeholder="Loại khách hàng"
                               onChange={this.handleChange}/>
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="5">
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Số điện thoại</Label>
                        </Col>
                        <Col xs="12" sm="9" style={{display: 'flex'}}>
                          <Input name="phoneCustomer" type="text" id="phoneCustomer"
                                 placeholder="Số điện thoại khách hàng"
                                 onChange={this.handleChange} required/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" sm="3">
                          <Label htmlFor="text-input">Địa chỉ</Label>
                        </Col>
                        <Col xs="12" sm="9">
                          <Input name="addressCustomer" type="text"
                                 id="addressCustomer"
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
                              onChange={this.handleChangeStartBuy}
                              dateFormat="dd/MM/yyyy"
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
                              onChange={(e)=>this.handleChangeLastBuy(e)}
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
                </form>
                </CardBody>
                <CardFooter>
                  <Row className="row justify-content-center">
                    <Col xs={12} sm={10}>
                      <Button className="pull-right"
                              onClick={() => this.handleResetForm()}
                              color="danger">
                        <i className="fa fa-ban"></i> Reset</Button>
                      <Button color="success"
                              className="pull-right"
                              onClick={() => this.handleCreateNewCustomer()}
                              style={{marginRight: '5px'}}>
                        <i className="fa fa-plus"/> Thêm</Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
    )
  }
}

export default CustomerManagement;