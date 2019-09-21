import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  FormText, Input,
  Label,
  Row
} from "reactstrap";
import moment from "moment";
import {DateRangePicker} from "react-dates";
import {toast} from "react-toastify";
import TableInOutMoney from "./TableInOutMoney";
import {getListInOutInvoice} from "../../api/invoiceApi";
import NumberFormat from "react-number-format";
import Loading from "../../components/Loading";

let currentDate = moment().format("DD/MM/YYYY");
let startOffMonth = moment().startOf('month').format("DD/MM/YYYY");

class MoneyManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
      result: null,
      loading: false,
    }
  }

  onDateChange = (from, to) => {
    this.setState({
      startDate: from,
      endDate: to
    });
  };

  componentDidMount() {
    this.handleSearchInOut()
  }

  handleSearchInOut = () => {
    const {startDate, endDate} = this.state;
    this.setState({
      loading: true,
    });
    const request = {
      dateFrom: startDate ? moment(startDate).format("DD/MM/YYYY") : startOffMonth,
      dateTo: endDate ?  moment(endDate).format("DD/MM/YYYY") : currentDate,
    };

    getListInOutInvoice(request).then(res => {
      if (res && res.data.returnCode === 1) {
        this.setState({
          result: res.data.result,
        })
      }
      else {
        this.setState({result: null});
        toast.error("Không có phản hồi từ server.")
      }
    }).catch(err => {
      console.log(err);
      toast.error("Không có phản hồi từ server.")
    }).finally(() => {
      this.setState({
        loading: false
      })
    })
  };

  createCustomClearButton = (onClick) => {
    return (
        <button className='btn btn-secondary' onClick={ onClick }>Clear</button>
    );
  };

  render() {

    return (
        <div className="animated fadeIn parent-padding">
          {
            this.state.loading ? <Loading/> : null
          }
          <Card>
            <CardBody>
              <Row className="row justify-content-center">
                <h3><i className="fa fa-plus"/> Quản lý thu chi</h3>
              </Row>
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

                          startDatePlaceholderText={startOffMonth}
                          endDatePlaceholderText={currentDate}

                          displayFormat="DD/MM/YYYY"
                          onDatesChange={
                            ({startDate, endDate}) => this.onDateChange(
                                startDate, endDate)
                          }

                          focusedInput={this.state.focusedInput}
                          onFocusChange={focusedInput => this.setState(
                                {focusedInput})
                          }
                          orientation={this.state.orientation}
                          openDirection={this.state.openDirection}
                          isOutsideRange={() => false}
                          minimumNights={0}
                      />
                      <Button type="button" color="primary"
                              style={{
                                maxWidth: "150px",
                                maxHeight: '50px',
                                marginLeft: '20px',
                                position: 'relative',
                                top: '-10px'
                              }}
                              onClick={()=>this.handleSearchInOut()}
                      >
                        <i className="fa fa-search"></i> Tìm kiếm
                      </Button>
                    </Col>
                    <FormText className="help-block">Tìm kiếm theo
                      tháng.</FormText>
                  </FormGroup>
                </Col>
                <Col xs={12} sm={12}>
                  <TableInOutMoney result={this.state.result}/>
                </Col>
              </Row>
              <h4>Tổng kết</h4>
              <Row>
                <Col md={3}>
                  <Label htmlFor="text-input">Tổng thu: </Label>
                  <Input type="number" readOnly
                         value={0}
                  />
                </Col>
                <Col md={3}>
                  <Label htmlFor="text-input">Tổng chi: </Label>
                  <Input type="number" readOnly
                         value={0}
                  />
                </Col>
                <Col md={3}>
                  <Label htmlFor="text-input">Tổng lời: </Label>
                  <Input type="number" readOnly
                         value={0}
                  />
                </Col>
                <Col md={3}>
                  <Label htmlFor="text-input">Tổng lỗ: </Label>
                  <Input type="number" readOnly
                         value={0}
                  />
                </Col>
              </Row>
              <hr/>
              <Row className="row justify-content-center">
                <h3><i className="fa fa-plus"/> Thu chi khác</h3>
              </Row>
              <Row style={{marginTop:"20px"}}>
                <Col xs="12" sm="6">
                  <FormGroup>
                    <Label htmlFor="text-input">Nội dung thu khác</Label>
                    <Input type="textarea"
                           placeholder="Nhập nội dung thu khác."
                           onChange={(e) => this.setState(
                               {code: e.target.value})}/>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6">
                  <FormGroup>
                    <Label htmlFor="text-input" style={{width:"500px"}}>Tổng thu khác</Label>
                    <NumberFormat prefix={"VND "}
                                  thousandSeparator={true}
                                  placeholder="Nhập tổng thu khác."
                                  onChange={(e) => this.setState(
                                      {gasName: e.target.value})}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" sm="6">
                  <FormGroup>
                    <Label htmlFor="text-input">Nội dung chi khác</Label>
                    <Input type="textarea"
                           placeholder="Nhập nội dung chi khác."
                           onChange={(e) => this.setState(
                               {color: e.target.value})}/>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6">
                  <FormGroup>
                    <Label htmlFor="text-input" style={{width:"500px"}}>Tổng chi khác</Label>
                    <NumberFormat thousandSeparator={true}
                                  prefix={"VND "}
                                  placeholder="Nhập tổng chi khác"
                                  onChange={(e) => this.setState(
                                      {unitPrice: e.target.value})}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button color="primary"
                      // onClick={() => this.handleSaveGasType()}
                      style={{marginBottom: '20px'}}>
                <i className="fa fa-plus"/> Thêm thông tin</Button>
            </CardBody>
          </Card>
        </div>
    );
  }
}

export default MoneyManagement;