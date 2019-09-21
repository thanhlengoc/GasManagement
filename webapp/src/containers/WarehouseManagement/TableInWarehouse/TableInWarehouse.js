import React, {PureComponent} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import shallowCompare from 'react-addons-shallow-compare';

function formatDataColMoney(cell, row) {
  return `${cell}`.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

class TableInWarehouse extends PureComponent {
  constructor(props) {
    super(props);

    this.setState({
      tableInWarehouse: null
    })
  }

  createCustomClearButton = (onClick) => {
    return (
        <button className='btn btn-secondary' onClick={onClick}>Clear</button>
    );
  };

  componentWillMount() {
    const {tableInWarehouse} = this.props;
    this.setState({
      tableInWarehouse: tableInWarehouse
    })
  }

  componentWillReceiveProps(nextProps) {
    if (shallowCompare(this, this.props, nextProps)) {
      this.setState({
        tableInWarehouse: nextProps.tableInWarehouse
      })
    }
  }

  render() {
    const {tableInWarehouse} = this.state;
    const options = {
      sortIndicator: true,
      hideSizePerPage: true,
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    };

    return (
        <BootstrapTable
            data={tableInWarehouse}
            className="expand-table"
            version="4"
            options={options}
            headerStyle={{backgroundColor: '#0099CC'}}
            pagination striped hover condensed
            bodyStyle={{overflow: 'overlay'}}
            search exportCSV>
          <TableHeaderColumn row='0' rowSpan='3' width='50' dataField='id' isKey
                             dataSort>ID</TableHeaderColumn>

          <TableHeaderColumn row='0' rowSpan='3' width='150' dataField='dateIn'>Ngày
            Nhập</TableHeaderColumn>

          <TableHeaderColumn row='0' colSpan='8' csvHeader='Nhập Kho'
                             headerAlign='center' hiddenOnInsert>Nhập
            Kho</TableHeaderColumn>

          <TableHeaderColumn row='1' colSpan='4' csvHeader='Elf Gas'
                             headerAlign='center' hiddenOnInsert>Elf
            Gas</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='elf6kg' width='100'
                             dataAlign='center' dataSort>Elf
            6</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='elf12kg' width='100' dataSort>Elf
            12</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='elf39kg' width='100' dataSort>Elf
            39</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='total12' width='100'
                             dataSort>Total12</TableHeaderColumn>

          <TableHeaderColumn row='1' colSpan='2' csvHeader='PM'
                             headerAlign='center'
                             hiddenOnInsert>PM</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='b12' width='90'
                             dataSort>B12</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='b45' width='90'
                             dataSort>B45</TableHeaderColumn>

          <TableHeaderColumn row='1' colSpan='2' csvHeader='Trả Vỏ'
                             headerAlign='center' hiddenOnInsert>Trả
            Vỏ</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='payShellB12' width='70'
                             dataSort>B12</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='payShellB45' width='70'
                             dataSort>B45</TableHeaderColumn>

          <TableHeaderColumn row='0' colSpan='3' csvHeader='Nhập Van, Bếp'
                             headerAlign='center' hiddenOnInsert>Nhập Van,
            Bếp</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='valve'
                             width='80'>Van</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='stove' width='90'>Bếp
            GĐ</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='torch' width='80'>Bếp
            Khò</TableHeaderColumn>

          <TableHeaderColumn row='0' colSpan='3' csvHeader='Nhập Khuyến mãi'
                             headerAlign='center' hiddenOnInsert>Nhập Khuyến
            mãi</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='oil'
                             width='80'>Dầu</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='sugar'
                             width='90'>Đường</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='glass'
                             width='80'>Ly</TableHeaderColumn>


          <TableHeaderColumn row='0' rowSpan='3' width='150'
                             dataField='totalMoney'
                             dataFormat={formatDataColMoney} dataSort>Thành
            tiền</TableHeaderColumn>
          <TableHeaderColumn row='0' rowSpan='3' width='150' dataField='payment'
                             dataFormat={formatDataColMoney} dataSort>Trả
            tiền</TableHeaderColumn>

          <TableHeaderColumn row='0' colSpan='3' csvHeader='Công nợ'
                             headerAlign='center' hiddenOnInsert>Công
            nợ</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='debtMoney'
                             width='120' dataFormat={formatDataColMoney}
                             dataSort>Tiền</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='debtB12' width='100'
                             dataSort>Vỏ B12</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='debtB45' width='100'
                             dataSort>Vỏ B45</TableHeaderColumn>
        </BootstrapTable>
    );
  }
}

export default TableInWarehouse;