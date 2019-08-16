import React, {Component} from 'react';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  FormText,
  Label,
  Row
} from "reactstrap";
import moment from "moment";
import {DateRangePicker} from "react-dates";
import {getListInOutInvoice} from "../../../api/invoiceApi";
import {toast} from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner";

let currentDate = moment().format("DD/MM/YYYY");
let startOffMonth = moment().startOf('month').format("DD/MM/YYYY");

class Invoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
      result: [],
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
      dateFrom: startDate ? startDate : startOffMonth,
      dateTo: endDate ?  endDate : currentDate,
    };

    //Todo: call Api
    getListInOutInvoice(request).then(res => {
      if (res) {
        if (res.data.returnCode === 1) {
          this.setState({
            result: res.data.result,
          })
        }
        else {
          toast.warn("Không có dữ liệu.")
        }
      }
      else {
        toast.error("Không có phản hồi từ server.")
      }
    }).catch(err => {
      console.log(err);
      toast.error("Không có phản hồi từ server.")
    }).finally(()=>{
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

    const options = {
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton
    };

    const selectRow = {
      mode: 'checkbox',
      bgColor: 'rgb(238, 193, 213)'
    };

    const products = [];
    for (let i=0; i<50; i++) {
      products.push({
        id: i,
        date: '02/07/2019',
        InvoiceAmount: '15',
        InMoney: '30,000,000',
        BallotAmount: '1',
        OutMoney: '20,000,000',
        income: '10,000,000',
        deficit: '0'
      })
    }

    return (
        <div className="animated fadeIn parent-padding">
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
                      <Button type="button" color="success"
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
                  {
                    this.state.loading ?
                        <LoadingSpinner/> : null
                  }
                  <BootstrapTable
                      data={ products }
                      className="expand-table"
                      options={options}
                      headerStyle={{backgroundColor:'#20a8d8'}}
                      selectRow={ selectRow }
                      pagination striped hover condensed
                      bodyStyle={{overflow: 'overlay'}}
                      search exportCSV>
                    <TableHeaderColumn row='0' rowSpan='2' width='50' dataField='id' isKey>TT</TableHeaderColumn>
                    <TableHeaderColumn row='0' rowSpan='2' width='150' dataField='date'>Ngày</TableHeaderColumn>
                    <TableHeaderColumn row='0' colSpan='2' dataSort csvHeader='Thu' headerAlign='right'>Thu</TableHeaderColumn>
                    <TableHeaderColumn row='1' dataField='InvoiceAmount' width='120' dataAlign='center'>Số hóa đơn</TableHeaderColumn>
                    <TableHeaderColumn row='1' dataField='InMoney' width='150' dataSort>Số tiền bán</TableHeaderColumn>
                    <TableHeaderColumn row='0' colSpan='2' csvHeader='Customer' filter={ { type: 'TextFilter', delay: 1000 } }>Chi</TableHeaderColumn>
                    <TableHeaderColumn row='1' csvHeader='name' width='120' dataField='BallotAmount'>Số phiếu nhập</TableHeaderColumn>
                    <TableHeaderColumn row='1' csvHeader='order' width='150' dataField='OutMoney' dataSort>Số tiền nhập</TableHeaderColumn>
                    <TableHeaderColumn row='0' rowSpan='2' width='150' dataField='income'>Tiền lời</TableHeaderColumn>
                    <TableHeaderColumn row='0' rowSpan='2' width='150' dataField='deficit'>Tiền lỗ</TableHeaderColumn>
                  </BootstrapTable>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
    );
  }
}

export default Invoice;