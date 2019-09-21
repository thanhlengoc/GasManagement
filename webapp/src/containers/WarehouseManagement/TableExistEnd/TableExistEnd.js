import React, {PureComponent} from 'react';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import shallowCompare from 'react-addons-shallow-compare';
import moment from "moment";

function formatDate(cell, row) {
  return moment(`${cell}`).format("DD/MM/YYYY");
}

class TableExistEnd extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tableExistEnd: null
    }
  }

  componentWillMount() {
    let {tableExistEnd} = this.props;
    this.setState({
      tableExistEnd: tableExistEnd
    })
  }

  componentWillReceiveProps(nextProps) {
    if (shallowCompare(this, this.props, nextProps)) {
      this.setState({
        tableExistEnd: nextProps.tableExistEnd
      })
    }
  }

  createCustomClearButton = (onClick) => {
    return (
        <button className='btn btn-secondary' onClick={onClick}>Clear</button>
    );
  };

  render() {
    const {tableExistEnd} = this.state;
    const options = {
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton,
      sortIndicator: true,
      hideSizePerPage: true,
    };

    return (
        <BootstrapTable
            data={tableExistEnd}
            className="expand-table"
            version="4"
            options={options}
            headerStyle={{backgroundColor: '#fb8c00'}}
            pagination striped hover condensed
            bodyStyle={{overflow: 'overlay'}}
            search exportCSV>
          <TableHeaderColumn row='0' rowSpan='3' width='50' dataField='key'
                             isKey dataSort>ID</TableHeaderColumn>

          <TableHeaderColumn row='0' rowSpan='3' width='150'
                             dataField='date' dataFormat={formatDate}>Ngày</TableHeaderColumn>

          <TableHeaderColumn row='0' colSpan='8' csvHeader='Tồn cuối'
                             headerAlign='center'>Tồn cuối</TableHeaderColumn>
          <TableHeaderColumn row='1' colSpan='3' csvHeader='Elf Gas'
                             headerAlign='center'>Elf Gas</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='elf6' width='120'
                             dataAlign='center' dataSort>Elf
            6</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='elf12' width='120' dataSort>Elf
            12</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='elf39' width='120' dataSort>Elf
            39</TableHeaderColumn>

          <TableHeaderColumn row='1' colSpan='2' csvHeader='PM'
                             headerAlign='center'>PM</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='b12' width='120'
                             dataSort>B12</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='b45' width='120'
                             dataSort>B45</TableHeaderColumn>

          <TableHeaderColumn row='1' colSpan='3' csvHeader='Tồn van bếp'
                             headerAlign='center'>Tồn Van,
            Bếp</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='valve'
                             width='120'>Van</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='stove' width='120'>Bếp
            GĐ</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='torch' width='120'>Bếp
            Khò</TableHeaderColumn>

          <TableHeaderColumn row='0' colSpan='3' csvHeader='Khuyến mãi'
                             headerAlign='center'>Khuyến mãi</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='oil'
                             width='100'>Dầu</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='sugar'
                             width='120'>Đường</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='glass'
                             width='100'>Ly</TableHeaderColumn>
        </BootstrapTable>
    );
  }
}

export default TableExistEnd;