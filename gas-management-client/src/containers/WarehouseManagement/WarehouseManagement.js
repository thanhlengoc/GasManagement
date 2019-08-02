import React, {Component} from 'react';
import {
  Row, Col, Card, CardHeader, CardBody,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  FormGroup, FormText,
  Label,
  Modal, ModalHeader,
  Table as TableReactstrap, Input, ModalBody, ModalFooter, Badge, Collapse
} from 'reactstrap';
import classnames from 'classnames';
import {DateRangePicker} from "react-dates";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize'
import moment from 'moment';
import DatePicker from "react-datepicker";
import '../../../scss/_custom.scss';
import {getAllGasType, saveGasType} from "../../api/gasType";
import TableExistEnd from "./TableExistEnd";
import TableOutWarehouse from "./TableOutWarehouse";
import TableInWarehouse from "./TableInWarehouse";
import {createNewBallot, getListData} from "../../api/warehouseApi";
import {toast} from "react-toastify";

let month = moment().format("DD/MM/YYYY");
let lastMonth = moment().startOf('month').format("DD/MM/YYYY");

class WarehouseManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      startDate: null,
      endDate: null,
      modal: false,
      dateInWarehouse: null,

      tableInWarehouse: [],
      newBallot: {},

      listAllGasType: null,
      code: '',
      gasName: '',
      weight: 0,
      color: '',
      unitPrice: 0,

      collapseNTL: false,
      collapseNKM: false,
      collapseTV: false,
      totalMoney: 0,
      payment: 0,
      oil: 0,
      sugar: 0,
      glass: 0,
      elf6kg: 0,
      elf12kg: 0,
      elf39kg: 0,
      b12: 0,
      b45: 0,
      payShellElf6kg: 0,
      payShellElf12kg: 0,
      payShellElf39kg: 0,
      payShellB12: 0,
      payShellB45:0
    };

    this.toggleTab = this.toggleTab.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleNLT = () => {
    this.setState(state => ({collapseNTL: !state.collapseNTL}));
  };

  toggleNKM = () => {
    this.setState(state => ({collapseNKM: !state.collapseNKM}));
  };

  toggleTV = () => {
    this.setState(state => ({collapseTV: !state.collapseTV}));
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onDateChange = (from, to) => {
    this.setState({
      startDate: from,
      endDate: to
    });
  };

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  onChangeDateInWarehouse = (date) => {
    this.setState({
      dateInWarehouse: date
    })
  };

  componentDidMount() {
    getAllGasType().then(res => {
      this.setState({
        listAllGasType: res.data.result
      })
    })
  }

  handleSaveGasType = () => {
    const {code, gasName, weight, color, unitPrice} = this.state;
    const request = {
      code: code ? code : '',
      gasName: gasName ? gasName : '',
      weight: weight ? weight : 0,
      color: color ? color : '',
      unitPrice: unitPrice ? unitPrice : 0
    };
    saveGasType(request)
  };

  handleCreateNewBallot = () => {
    const request = {

    };

    createNewBallot(request).then(res => {
      if(parseInt(res.data.returnCode) === 1){
        this.setState({
          newBallot: res.data.result
        });
        toast.success(res.data.returnMessage);
      }
      else {
        toast.error(res.data.returnMessage);
      }
    }).catch(err => {
      console.log(err);
      toast.error("Không có phản hồi từ server.")
    })
  };

  handleGetTableInWarehouse = () => {
    getListData().then(res => {
      if(parseInt(res.data.returnCode) === 1) {
        this.setState({
          tableInWarehouse: res.data.result
        })
      }
      else {
        toast.error(res.data.returnMessage);
      }
    }).catch(err => {
      console.log(err);
      toast.error("Không có phản hồi từ server.")
    })
  };

  handleSearchData = () => {

  };

  render() {
    const {listAllGasType} = this.state;

    return (
        <div className="animated fadeIn parent-padding">
          <Row>
            <Col xs={12} sm={12}>
              <Card>
                <CardHeader>
                  <Nav pills>
                    <NavItem>
                      <NavLink className={classnames(
                          {active: this.state.activeTab === '1'})}
                               onClick={() => {
                                 this.toggleTab('1');
                               }}><strong><i className="fa fa-search"></i> Thông
                        tin kho</strong>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={classnames(
                          {active: this.state.activeTab === '2'})}
                               onClick={() => {
                                 this.toggleTab('2');
                               }}><strong><i className="fa fa-plus"/> Loại
                        Gas</strong>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId='1'>
                    <Row>
                      <Col xs={12} sm={12}>
                        <FormGroup>
                          <Label htmlFor="name">Thời gian</Label>
                          <Col xs="auto" className="pl-0">
                            <DateRangePicker
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}

                                startDateId="startDate"
                                endDateId="endDate"

                                startDatePlaceholderText={lastMonth}
                                endDatePlaceholderText={month}

                                displayFormat="DD/MM/YYYY"
                                onDatesChange={
                                  ({startDate, endDate}) => this.onDateChange(
                                      startDate, endDate)
                                }

                                focusedInput={this.state.focusedInput}
                                onFocusChange={
                                  focusedInput => this.setState(
                                      {focusedInput})
                                }
                                orientation={this.state.orientation}
                                openDirection={this.state.openDirection}
                                isOutsideRange={() => false}
                                minimumNights={0}
                            />
                            <Button type="button" color="success"
                                    style={{
                                      maxWidth: "150px",
                                      maxHeight: '50px',
                                      marginLeft: '20px',
                                      position: 'relative',
                                      top: '-10px'
                                    }}
                            >
                              <i className="fa fa-search"></i> Tìm kiếm
                            </Button>
                          </Col>
                          <FormText className="help-block">Tìm kiếm theo
                            tháng.</FormText>
                        </FormGroup>
                      </Col>
                    </Row>
                    <hr/>
                    <Row>
                      <Col xs={12} sm={12}>
                        <Badge color="secondary" style={{marginBottom: '5px'}}>
                          <h4>Nhập kho</h4>
                        </Badge>
                        <Button color="info" className="pull-right"
                                onClick={() => this.toggleModal()}>
                          <i className="fa fa-plus"/> Thêm mới
                        </Button>
                        <TableInWarehouse/>
                      </Col>
                    </Row>
                    <hr/>
                    <Badge color="secondary" style={{marginBottom: '5px'}}>
                      <h4>Xuất bán</h4>
                    </Badge>
                    <TableOutWarehouse/>
                    <hr/>
                    <Badge color="secondary" style={{marginBottom: '5px'}}>
                      <h4>Tồn cuối</h4>
                    </Badge>
                    <TableExistEnd/>
                  </TabPane>
                  <TabPane tabId='2'>
                    <Row style={{marginBottom: '20px'}}>
                      <Col xs="12" sm="12">
                        <Row>
                          <Col xs="12" sm="4">
                            <FormGroup>
                              <Label htmlFor="text-input">Mã bình ga</Label>
                              <Input type="text" id="text-input"
                                     placeholder="Mã bình ga"
                                     value={this.state.code}
                                     onChange={(e) => this.setState(
                                         {code: e.target.value})}/>
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="4">
                            <FormGroup>
                              <Label htmlFor="text-input">Tên loại</Label>
                              <Input type="text" id="text-input"
                                     placeholder="Tên loại"
                                     value={this.state.gasName}
                                     onChange={(e) => this.setState(
                                         {gasName: e.target.value})}
                                     required/>
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="4">
                            <FormGroup>
                              <Label htmlFor="text-input">Cân nặng</Label>
                              <Input type="text" id="text-input"
                                     placeholder="Cân nặng"
                                     value={this.state.weight}
                                     onChange={(e) => this.setState(
                                         {weight: e.target.value})}/>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="12" sm="4">
                            <FormGroup>
                              <Label htmlFor="text-input">Màu sắc</Label>
                              <Input type="text" id="text-input"
                                     placeholder="Màu sắc"
                                     value={this.state.color}
                                     onChange={(e) => this.setState(
                                         {color: e.target.value})}/>
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="4">
                            <FormGroup>
                              <Label htmlFor="text-input">Đơn giá</Label>
                              <Input type="text" id="text-input"
                                     placeholder="Đơn giá"
                                     value={this.state.unitPrice}
                                     onChange={(e) => this.setState(
                                         {unitPrice: e.target.value})}/>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button color="success"
                                onClick={() => this.handleSaveGasType()}
                                style={{marginBottom: '20px'}}>
                          <i className="fa fa-plus"/> Thêm Loại Gas</Button>
                        <TableReactstrap responsive striped>
                          <thead>
                          <tr>
                            <th>TT</th>
                            <th>Mã bình</th>
                            <th>Tên Loại</th>
                            <th>Cân nặng</th>
                            <th>Màu sắc</th>
                            <th>Đơn giá nhập</th>
                            <th>Đơn giá bán</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                            listAllGasType ? listAllGasType.map(
                                (item, index) => {
                                  return (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.code}</td>
                                        <td>{item.gasName}</td>
                                        <td>{item.weight + " kg"}</td>
                                        <td>{item.color}</td>
                                        <td>{item.unitPriceIn}</td>
                                        <td>{item.unitPriceOut}</td>
                                      </tr>
                                  )
                                })
                                : null
                          }
                          </tbody>
                        </TableReactstrap>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </Card>
            </Col>
          </Row>

          <Modal isOpen={this.state.modal} toggle={this.toggleModal}
                 className={this.props.className}>
            <ModalHeader toggle={this.toggleModal}
                         style={{textAlign: 'center'}}>
              <strong>Thêm phiếu nhập</strong>
            </ModalHeader>
            <ModalBody>
              <Col xs={12} sm={12}>
                <FormGroup row>
                  <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                    <strong>Ngày nhập:</strong>
                  </Label>
                  <DatePicker
                      className="form-control"
                      placeholderText={month}
                      selected={this.state.startDatePurchase}
                      onChange={() => this.onChangeDateInWarehouse()}
                      dateFormat="DD/MM/YYYY"
                  />
                </FormGroup>
                <FormGroup row>
                  <Button color="info" onClick={() => this.toggleNLT()}
                          style={{marginBottom: '1rem'}}>Nhập theo loại</Button>
                  <Collapse isOpen={this.state.collapseNTL}>
                    <Card>
                      <CardBody>
                        <Col xs={12} sm={12}>
                          <FormGroup row>
                            <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                              <strong>Elf 6kg: </strong>
                            </Label>
                            <Input name="elf6kg" type="text" id="text-input"
                                   placeholder="0"
                                   onChange={this.handleChange}/>
                          </FormGroup>
                          <FormGroup row>
                            <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                              <strong>Elf 12kg:</strong>
                            </Label>
                            <Input name="elf12kg" type="text" id="text-input"
                                   placeholder="0"
                                   onChange={this.handleChange}
                                   />
                          </FormGroup>
                          <FormGroup row>
                            <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                              <strong>Elf 39kg:</strong>
                            </Label>
                            <Input name="elf39kg" type="text" id="text-input"
                                   placeholder="0"
                                   onChange={this.handleChange}
                                   />
                          </FormGroup>
                          <FormGroup row>
                            <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                              <strong>B12:</strong>
                            </Label>
                            <Input name="b12" type="text" id="text-input"
                                   placeholder="0"
                                   onChange={this.handleChange}
                                   />
                          </FormGroup>
                          <FormGroup row>
                            <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                              <strong>B45:</strong>
                            </Label>
                            <Input name="b45" type="text" id="text-input"
                                   placeholder="0"
                                   onChange={this.handleChange}
                                   />
                          </FormGroup>
                        </Col>
                      </CardBody>
                    </Card>
                  </Collapse>
                </FormGroup>
                <FormGroup row>
                  <Button color="info" onClick={() => this.toggleTV()}
                          style={{marginBottom: '1rem'}}>Trả vỏ</Button>
                  <Collapse isOpen={this.state.collapseTV}>
                    <Card>
                      <CardBody>
                        <Col xs={12} sm={12}>
                          <FormGroup row>
                            <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                              <strong>Trả vỏ Elf 6kg: </strong>
                            </Label>
                            <Input name="payShellElf6kg" type="text" id="text-input"
                                   placeholder="0"
                                   onChange={this.handleChange}
                                   />
                          </FormGroup>
                          <FormGroup row>
                            <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                              <strong>Trả vỏ Elf 12kg:</strong>
                            </Label>
                            <Input name="payShellElf12kg" type="text" id="text-input"
                                   placeholder="0"
                                   onChange={this.handleChange}
                                   />
                          </FormGroup>
                          <FormGroup row>
                            <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                              <strong>Trả vỏ Elf 39kg:</strong>
                            </Label>
                            <Input name="payShellElf39kg" type="text" id="text-input"
                                   placeholder="0"
                                   onChange={this.handleChange}
                                   />
                          </FormGroup>
                          <FormGroup row>
                            <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                              <strong>Trả vỏ B12:</strong>
                            </Label>
                            <Input name="payShellB12" type="text" id="text-input"
                                   placeholder="0"
                                   onChange={this.handleChange}
                                   />
                          </FormGroup>
                          <FormGroup row>
                            <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                              <strong>Trả vỏ B45:</strong>
                            </Label>
                            <Input name="payShellB45" type="text" id="text-input"
                                   placeholder="0"
                                   onChange={this.handleChange}/>
                          </FormGroup>
                        </Col>
                      </CardBody>
                    </Card>
                  </Collapse>
                </FormGroup>
                <FormGroup row>
                  <Button color="info" onClick={() => this.toggleNKM()}
                          style={{marginBottom: '1rem'}}>Nhập Khuyến Mãi</Button>
                  <Collapse isOpen={this.state.collapseNKM}>
                    <Card>
                      <CardBody>
                        <Col xs={12} sm={12}>
                          <FormGroup row>
                            <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                              <strong>Dầu: </strong>
                            </Label>
                            <Input name="oil" type="text" id="text-input"
                                   placeholder="Số lượng dầu chai 500ml"
                                   onChange={this.handleChange}
                                   />
                          </FormGroup>
                          <FormGroup row>
                            <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                              <strong>Đường:</strong>
                            </Label>
                            <Input name="sugar" type="text" id="text-input"
                                   placeholder="số lượng đường (kg)"
                                   onChange={this.handleChange}
                                   />
                          </FormGroup>
                          <FormGroup row>
                            <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                              <strong>Ly:</strong>
                            </Label>
                            <Input name="glass" type="text" id="text-input"
                                   placeholder="Số lượng ly (cái)"
                                   onChange={this.handleChange}
                                   />
                          </FormGroup>
                        </Col>
                      </CardBody>
                    </Card>
                  </Collapse>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                    <strong>Thành tiền:</strong>
                  </Label>
                  <Input name="totalMoney" type="text" id="text-input"
                         placeholder="thành tiền"
                         onChange={this.handleChange}
                         readOnly/>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                    <strong>Trả tiền:</strong>
                  </Label>
                  <Input name="payment" type="text" id="text-input"
                         placeholder="trả tiền"
                         onChange={this.handleChange}
                         required/>
                </FormGroup>
              </Col>
            </ModalBody>
            <ModalFooter>
              <Button color="success"
                      onClick={this.toggleModal}>Xác nhận thêm</Button>
              <Button color="danger"
                      onClick={this.toggleModal}>Đóng</Button>
            </ModalFooter>
          </Modal>
        </div>
    );
  }

}

export default WarehouseManagement;