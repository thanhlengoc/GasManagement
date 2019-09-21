import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import "../../../../scss/_custom.scss";
import shallowCompare from 'react-addons-shallow-compare';
import ModalMoreInfo from "../ModalMoreInfo";

let original = "233 Dương Vân Nga, Phường Vĩnh Hải, Thành phố Nha Trang, Tỉnh Khánh Hòa";

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
      <ModalMoreInfo cusID={cell} customer={row}/>
  )
}

class TableCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAllCustomer: null,
    }
  }

  createCustomClearButton = (onClick) => {
    return (
        <button className='btn btn-secondary' onClick={onClick}>Clear</button>
    )
  };

  componentWillMount() {
    let {listAllCustomer} = this.props;
    this.setState({
      listAllCustomer: listAllCustomer
    })
  }

  componentWillReceiveProps(nextProps) {
    if (shallowCompare(this, this.props, nextProps)) {
      this.setState({
        listAllCustomer: nextProps.data
      })
    }
  }

  render() {
    const {listAllCustomer} = this.state;
    const options = {
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton,
      sortIndicator: true,
      hideSizePerPage: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    };

    const customers = [];
    listAllCustomer ? listAllCustomer.map((i, index) => {
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
    }) : null;

    return (
        <BootstrapTable
            className="expand-table" version="4"
            data={customers}
            options={options}
            headerStyle={{backgroundColor:"#20a8d8"}}
            pagination striped hover condensed
            bodyStyle={{overflow: 'overlay'}}
            search exportCSV>
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
          <TableHeaderColumn width='150' dataField='cyclePurchase' dataSort>Chu kỳ mua</TableHeaderColumn>
          <TableHeaderColumn width='100' dataField='totalScore' dataSort>Tổng
            điểm</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='note'>Ghi
            chú</TableHeaderColumn>
        </BootstrapTable>
    );
  }
}

export default TableCustomer;