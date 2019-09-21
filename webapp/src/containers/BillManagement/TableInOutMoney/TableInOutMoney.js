import React, {PureComponent} from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import shallowCompare from 'react-addons-shallow-compare';

function formatDataColMoney(cell, row) {
  return `${cell}`.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " VND";
}

class TableInOutMoney extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      result: null
    }
  }

  componentWillMount() {
    const {result} = this.props;
    this.setState({
      result: result
    })
  }

  componentWillReceiveProps(nextProps) {
    if (shallowCompare(this, this.props, nextProps)) {
      this.setState({
        result: nextProps.result
      })
    }
  }

  render() {
    const {result} = this.state;
    const options = {
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton
    };

    return (
        <BootstrapTable
            data={result} className="expand-table"
            options={options}
            headerStyle={{backgroundColor: '#20a8d8'}}
            pagination striped hover condensed
            bodyStyle={{overflow: 'overlay'}}
            search exportCSV>
          <TableHeaderColumn row='0' rowSpan='2' width='50'
                             dataField='key'
                             isKey>ID</TableHeaderColumn>
          <TableHeaderColumn row='0' rowSpan='2' width='150'
                             dataField='date'>Ngày</TableHeaderColumn>
          <TableHeaderColumn row='0' colSpan='4' dataSort csvHeader='Thu'
                             headerAlign='right'>Thu</TableHeaderColumn>
          <TableHeaderColumn row='1' dataField='totalSheetOut' width='120'
                             dataAlign='center'>Số hóa đơn</TableHeaderColumn>
          <TableHeaderColumn row='1' dataField='totalMoneyIn' width='150'
                             dataFormat={formatDataColMoney}
                             dataSort>Số tiền thu</TableHeaderColumn>
          <TableHeaderColumn row='1' dataField='InvoiceAmount' width='120'
                             dataAlign='center'>Thu khác</TableHeaderColumn>
          <TableHeaderColumn row='1' dataField='InMoney' width='150' dataSort>Nội
            dung</TableHeaderColumn>
          <TableHeaderColumn row='0' colSpan='4' csvHeader='Customer' filter={{
            type: 'TextFilter',
            delay: 1000
          }}>Chi</TableHeaderColumn>
          <TableHeaderColumn row='1' csvHeader='name' width='120'
                             dataField='totalSheetIn'>Số phiếu
            nhập</TableHeaderColumn>
          <TableHeaderColumn row='1' csvHeader='order' width='150'
                             dataField='totalMoneyOut' dataFormat={formatDataColMoney} dataSort>Số tiền
            chi</TableHeaderColumn>
          <TableHeaderColumn row='1' csvHeader='name' width='120'
                             dataField='BallotAmount'>Chi
            khác</TableHeaderColumn>
          <TableHeaderColumn row='1' csvHeader='order' width='150'
                             dataField='OutMoney' dataSort>Nội
            dung</TableHeaderColumn>
          <TableHeaderColumn row='0' rowSpan='2' width='150' dataFormat={formatDataColMoney}
                             dataField='income'>Tiền lời</TableHeaderColumn>
          <TableHeaderColumn row='0' rowSpan='2' width='150'
                             dataField='moneyLost'>Tiền lỗ</TableHeaderColumn>
        </BootstrapTable>
    );
  }
}

export default TableInOutMoney;