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
import {deleteGas, getAllGasType, saveGasType} from "../../api/gasType";
import TableExistEnd from "./TableExistEnd";
import TableOutWarehouse from "./TableOutWarehouse";
import TableInWarehouse from "./TableInWarehouse";
import {
  createNewBallot, getListDataExistEnd,
  getListDataInWarehouse,
  getListDataOutWarehouse
} from "../../api/warehouseApi";
import {toast} from "react-toastify";
import Loading from "../../components/Loading";

let month = moment().add(1, 'days').format("DD/MM/YYYY");
let lastMonth = moment().startOf('month').format("DD/MM/YYYY");
let currentDay = moment().format("DD/MM/YYYY");

class WarehouseManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      startDate: null,
      endDate: null,
      modal: false,
      dateInWarehouse: new Date(),

      tableInWarehouse: [],
      tableOutWarehouse: [],
      tableExistEnd: [],
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
      other: "",
      valve: 0,
      stove: 0,
      torch: 0,
      priceValve: 0,
      priceStove: 0,
      priceTorch: 0,
      payShellElf6kg: 0,
      payShellElf12kg: 0,
      payShellElf39kg: 0,
      payShellB12: 0,
      payShellB45:0,
      note: "",
      loading: false
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
      this.setState({activeTab: tab});
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
      this.setState({listAllGasType: res.data.result})
    });
    this.handleSearchData();
  }

  handleSaveGasType = () => {
    this.setState({loading: true});
    const {code, gasName, weight, color, unitPrice} = this.state;
    const request = {
      code: code ? code : '',
      gasName: gasName ? gasName : '',
      weight: weight ? weight : 0,
      color: color ? color : '',
      unitPriceIn: unitPrice ? unitPrice : 0
    };
    saveGasType(request).then(()=>this.setState({loading: false}))
  };

  handleDeleteGas = (id) => {
    this.setState({loading: true});
    if (id) {
      deleteGas(id).then((res)=> {
        if (res && parseInt(res.data.returnCode) === 1) {
          toast.success(res.data.returnMessage)
        }
        else {
          toast.error(res.data.returnMessage)
        }
      }).finally(()=>this.setState({loading:false}))
    }
    else {
      toast.warn("Không tìm thấy loại gas này.");
      this.setState({loading: false})
    }
  };

  handleCreateNewBallot = () => {
    this.setState({loading: true});
    const {elf6kg, elf12kg, elf39kg, b12, b45, payShellElf6kg, payShellElf12kg, other, note,
      payShellElf39kg, payShellB12, payShellB45,oil, sugar, glass, payment, dateInWarehouse, valve,
      stove, torch, priceValve, priceStove, priceTorch} = this.state;
    const {fullName} = this.props;
    const request = {
      dateIn: moment(dateInWarehouse).format("DD/MM/YYYY HH:mm:ss"),
      personIn: fullName ? fullName : "",
      elf6kg: elf6kg,
      elf12kg: elf12kg,
      elf39kg: elf39kg,
      b12: b12,
      b45: b45,
      other: other,
      valve: valve,
      stove: stove,
      torch: torch,
      priceValve: priceValve,
      priceStove: priceStove,
      priceTorch: priceTorch,
      payShellElf6kg: payShellElf6kg,
      payShellElf12kg: payShellElf12kg,
      payShellElf39kg: payShellElf39kg,
      payShellB12: payShellB12,
      payShellB45: payShellB45,
      oil: oil,
      sugar: sugar,
      glass: glass,
      payment: payment,
      note: note
    };

    createNewBallot(request).then(res => {
      if (res) {
        if(parseInt(res.data.returnCode) === 1){
          this.setState({
            newBallot: res.data.result
          });
          toast.success(res.data.returnMessage);
          this.toggleModal();
        }
        else {
          toast.error(res.data.returnMessage);
        }
      }
      else {
        toast.error("Không có phản hồi từ server.")
      }
    }).catch(err => {
      console.log(err);
      toast.error("Không có phản hồi từ server.")
    }).finally(()=>{
      this.setState({loading: false})
    })
  };

  handleSearchData = () => {
    const {startDate, endDate} = this.state;
    this.setState({
      loading: true
    });
    const request = {
      dateFrom: startDate ? moment(startDate).format("DD/MM/YYYY") : lastMonth,
      dateTo: endDate ? moment(endDate).add(1, 'days').format("DD/MM/YYYY") : month
    };
    let inWarehouse = getListDataInWarehouse(request);
    let outWarehouse = getListDataOutWarehouse(request);
    let existEnd = getListDataExistEnd(request);

    Promise.all([inWarehouse, outWarehouse, existEnd]).then(res => {
      if (res) {
        let dataInWarehouse = res[0].data.result;
        let dataOutWarehouse = res[1].data.result;
        let dataExistEnd = res[2].data.result;

        this.setState({
          tableInWarehouse: dataInWarehouse,
          tableOutWarehouse: dataOutWarehouse,
          tableExistEnd: dataExistEnd
        })
      }
      else {
        toast.warn("Không có dữ liệu trả về.")
      }
    }).catch(err => {
      console.log(err);
      toast.error("Không có phản hồi. Vui lòng thử lại.")
    }).finally(()=>{
      this.setState({loading: false})
    });
  };

  render() {
    const {listAllGasType} = this.state;

    return (
        <div className="animated fadeIn parent-padding">
          {
            this.state.loading ? <Loading/> : null
          }
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
                                    onClick={()=>this.handleSearchData()}
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
                        <TableInWarehouse tableInWarehouse={this.state.tableInWarehouse}/>
                      </Col>
                    </Row>
                    <h4>Tổng nhập mỗi loại</h4>
                    <Row>
                      <Col sm={3}>
                        <Label htmlFor="text-input">Elf 6:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Elf 12:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Elf 39:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">B12:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">B45:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Total12:</Label>
                        <Input type="number" readOnly
                               value={0}
                        />
                      </Col>
                      <Col sm={3}>
                        <Label htmlFor="text-input">Van:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Bếp GĐ:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Bếp khò:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                      </Col>
                      <Col sm={3}>
                        <Label htmlFor="text-input">Dầu:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Đường:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Ly:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                      </Col>
                      <Col sm={3}>
                        <Label htmlFor="text-input">Công nợ tiền:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Công nợ B12:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Công nợ B45:</Label>
                        <Input type="number" readOnly
                               value={0}
                        />
                      </Col>
                    </Row>
                    <hr/>
                    <Badge color="secondary" style={{marginBottom: '5px'}}>
                      <h4>Xuất bán</h4>
                    </Badge>
                    <TableOutWarehouse tableOutWarehouse={this.state.tableOutWarehouse}/>
                    <h4>Tổng xuất bán mỗi loại</h4>
                    <Row>
                      <Col xs={3}>
                        <Label htmlFor="text-input">Elf 6:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Elf 12:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Elf 39:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">B12:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">B45:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Total12:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                      </Col>
                      <Col xs={3}>
                        <Label htmlFor="text-input">Van:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Bếp GĐ:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Bếp khò:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                      </Col>
                      <Col xs={3}>
                        <Label htmlFor="text-input">Dầu:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Đường:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Ly:</Label>
                        <Input type="number" readOnly
                               value={0}
                        />
                      </Col>
                      <Col xs={3}>
                        <Label htmlFor="text-input">Khách hàng nợ tiền:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Khách hàng nợ B12:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Khách hàng nợ B45:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                      </Col>
                    </Row>
                    <hr/>
                    <Badge color="secondary" style={{marginBottom: '5px'}}>
                      <h4>Tồn cuối</h4>
                    </Badge>
                    <TableExistEnd tableExistEnd={this.state.tableExistEnd}/>
                    <h4>Tổng tồn cuối mỗi loại</h4>
                    <Row>
                      <Col sm={4}>
                        <Label htmlFor="text-input">Elf 6:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Elf 12:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Elf 39:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">B12:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">B45:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Total12:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                      </Col>
                      <Col sm={4}>
                        <Label htmlFor="text-input">Van:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Bếp GĐ:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Bếp khò:</Label>
                        <Input type="number" readOnly
                               value={0}
                        />
                      </Col>
                      <Col sm={4}>
                        <Label htmlFor="text-input">Dầu:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Đường:</Label>
                        <Input type="number" readOnly
                               style={{marginBottom:'10px'}}
                               value={0}
                        />
                        <Label htmlFor="text-input">Ly:</Label>
                        <Input type="number" readOnly
                               value={0}
                        />
                      </Col>
                    </Row>
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
                              <Input type="number"
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
                              <Label htmlFor="text-input">Đơn giá Nhập</Label>
                              <Input type={"number"}
                                     value={this.state.unitPrice}
                                     onChange={(e) => this.setState(
                                         {unitPrice: e.target.value})}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button color="success"
                                onClick={() => this.handleSaveGasType()}
                                style={{marginBottom: '20px'}}>
                          <i className="fa fa-plus"/> Thêm Loại Gas</Button>
                        <TableReactstrap responsive striped bordered className="table-header">
                          <thead>
                          <tr>
                            <th>TT</th>
                            <th>Mã bình</th>
                            <th>Tên Loại</th>
                            <th>Cân nặng</th>
                            <th>Màu sắc</th>
                            <th>Đơn giá nhập</th>
                            <th>Đơn giá bán</th>
                            <th>Action</th>
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
                                        <td>
                                          <Button color={"danger"}
                                                  onClick={()=>this.handleDeleteGas(item.id)}
                                          >
                                            Xóa
                                          </Button>
                                        </td>
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
                 className={'modal-lg modal-lg-custom' + this.props.className}
                 style={{maxWidth: '80%'}}
          >
            {
              this.state.loading ? <Loading/> : null
            }
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
                      placeholderText={currentDay}
                      selected={this.state.dateInWarehouse}
                      onChange={this.onChangeDateInWarehouse}
                      dateFormat="dd/MM/yyyy"
                  />
                </FormGroup>
                <FormGroup row>
                  <Col md={4}>
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
                              <Input name="elf6kg" type="number"
                                     onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup row>
                              <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                                <strong>Elf 12kg:</strong>
                              </Label>
                              <Input name="elf12kg" type="number"
                                     onChange={this.handleChange}
                              />
                            </FormGroup>
                            <FormGroup row>
                              <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                                <strong>Elf 39kg:</strong>
                              </Label>
                              <Input name="elf39kg" type="number"
                                     onChange={this.handleChange}
                              />
                            </FormGroup>
                            <FormGroup row>
                              <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                                <strong>B12:</strong>
                              </Label>
                              <Input name="b12" type="number"
                                     onChange={this.handleChange}
                              />
                            </FormGroup>
                            <FormGroup row>
                              <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                                <strong>B45:</strong>
                              </Label>
                              <Input name="b45" type="number"
                                     onChange={this.handleChange}
                              />
                            </FormGroup>
                          </Col>
                        </CardBody>
                      </Card>
                    </Collapse>
                  </Col>
                  <Col md={4}>
                    <Button color="info" onClick={() => this.toggleTV()}
                            style={{marginBottom: '1rem'}}>Trả vỏ</Button>
                    <Collapse isOpen={this.state.collapseTV}
                    >
                      <Card>
                        <CardBody>
                          <Col xs={12} sm={12}>
                            <FormGroup row>
                              <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                                <strong>Trả vỏ Elf 6kg: </strong>
                              </Label>
                              <Input name="payShellElf6kg" type="number"
                                     onChange={this.handleChange}
                              />
                            </FormGroup>
                            <FormGroup row>
                              <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                                <strong>Trả vỏ Elf 12kg:</strong>
                              </Label>
                              <Input name="payShellElf12kg" type="number"
                                     onChange={this.handleChange}
                              />
                            </FormGroup>
                            <FormGroup row>
                              <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                                <strong>Trả vỏ Elf 39kg:</strong>
                              </Label>
                              <Input name="payShellElf39kg" type="number"
                                     onChange={this.handleChange}
                              />
                            </FormGroup>
                            <FormGroup row>
                              <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                                <strong>Trả vỏ B12:</strong>
                              </Label>
                              <Input name="payShellB12" type="number"
                                     onChange={this.handleChange}
                              />
                            </FormGroup>
                            <FormGroup row>
                              <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                                <strong>Trả vỏ B45:</strong>
                              </Label>
                              <Input name="payShellB45" type="number"
                                     onChange={this.handleChange}/>
                            </FormGroup>
                          </Col>
                        </CardBody>
                      </Card>
                    </Collapse>
                  </Col>
                  <Col md={4}>
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
                              <Input name="oil" type="number"
                                     placeholder="Số lượng dầu chai 500ml"
                                     onChange={this.handleChange}
                              />
                            </FormGroup>
                            <FormGroup row>
                              <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                                <strong>Đường:</strong>
                              </Label>
                              <Input name="sugar" type="number"
                                     placeholder="số lượng đường (kg)"
                                     onChange={this.handleChange}
                              />
                            </FormGroup>
                            <FormGroup row>
                              <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                                <strong>Ly:</strong>
                              </Label>
                              <Input name="glass" type="number"
                                     placeholder="Số lượng ly (cái)"
                                     onChange={this.handleChange}
                              />
                            </FormGroup>
                          </Col>
                        </CardBody>
                      </Card>
                    </Collapse>
                  </Col>
                </FormGroup>
                <FormGroup row>
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
                    <Input name="stove" type="number"
                           placeholder="Số lượng"
                           style={{marginBottom:'5px'}}
                           onChange={this.handleChange}/>
                    <Input name="priceTorch" type="number"
                           placeholder="Giá"
                           onChange={this.handleChange}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={6}>
                    <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                      <strong>Trả tiền:</strong>
                    </Label>
                    <Input type={"number"} placeholder="Trả tiền"
                           name="payment"
                           onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={6}>
                    <Label htmlFor="text-input" style={{marginRight: '10px'}}>
                      <strong>Thành tiền:</strong>
                    </Label>
                    <Input name="totalMoney" type="number"
                           placeholder="Thành tiền"
                           onChange={this.handleChange}
                           readOnly/>
                  </Col>
                </FormGroup>
              </Col>
            </ModalBody>
            <ModalFooter>
              <Button color="success"
                      onClick={()=>this.handleCreateNewBallot()}>Xác nhận thêm</Button>
              <Button color="danger"
                      onClick={this.toggleModal}>Đóng</Button>
            </ModalFooter>
          </Modal>
        </div>
    );
  }

}

export default WarehouseManagement;