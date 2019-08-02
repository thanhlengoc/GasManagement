import React, {Component} from 'react';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class TableExistEnd extends Component {
  constructor(props) {
    super(props);

  }

  createCustomClearButton = (onClick) => {
    return (
        <button className='btn btn-secondary' onClick={ onClick }>Clear</button>
    );
  };

  render() {
    const options = {
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton,
      sortIndicator: true,
      hideSizePerPage: true,
    };

    const selectRow = {
      mode: 'checkbox',
      bgColor: 'rgb(238, 193, 213)'
    };

    const products = [];
    for (let i=0; i<50; i++) {
      products.push({
        id: i,
        date: '09/07/2019',
        elf6kg: '300',
        elf12kg: '300',
        elf39kg: '300',
        b12: '500',
        b45: '400',
        other: 'bếp',
        unit: 'cái, bình',
        shellElf6kg: '234',
        shellElf12kg: '234',
        shellElf39kg: '234',
        shellB12: '234',
        shellB45: '234',
        oil: '100',
        sugar: '200',
        glass: '500',
      })
    }

    return (
        <BootstrapTable
            data={ products }
            className="expand-table"
            version="4"
            options={options}
            headerStyle={{backgroundColor:'#f86c6b'}}
            selectRow={ selectRow }
            pagination striped hover condensed
            bodyStyle={{overflow: 'overlay'}}
            search deleteRow exportCSV>
          <TableHeaderColumn row='0' rowSpan='3' width='50' dataField='id' isKey dataSort>ID</TableHeaderColumn>

          <TableHeaderColumn row='0' rowSpan='3' width='150' dataField='date'>Ngày</TableHeaderColumn>

          <TableHeaderColumn row='0' colSpan='12' csvHeader='Số lượng bình nguyên và vỏ'
                             headerAlign='center'>Số lượng bình nguyên và vỏ</TableHeaderColumn>
          <TableHeaderColumn row='1' colSpan='3' csvHeader='Elf Gas'
                             headerAlign='center'>Elf Gas</TableHeaderColumn>
            <TableHeaderColumn row='2' dataField='elf6kg' width='120' dataAlign='center' dataSort>Elf 6kg</TableHeaderColumn>
            <TableHeaderColumn row='2' dataField='elf12kg' width='120' dataSort>Elf 12kg</TableHeaderColumn>
            <TableHeaderColumn row='2' dataField='elf39kg' width='120' dataSort>Elf 39kg</TableHeaderColumn>

          <TableHeaderColumn row='1' colSpan='2' csvHeader='PM'
                             headerAlign='center'>PM</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='b12' width='120' dataSort>B12</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='b45' width='120' dataSort>B45</TableHeaderColumn>

          <TableHeaderColumn row='1' rowSpan='2' dataField='other' width='150'>Khác</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='unit' width='150'>Đơn vị</TableHeaderColumn>

          <TableHeaderColumn row='1' colSpan='5' csvHeader='Vỏ'
                             headerAlign='center'>Vỏ</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='shellElf6kg' width='120' dataSort>Elf 6kg</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='shellElf12kg' width='120' dataSort>Elf 12kg</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='shellElf39kg' width='120' dataSort>Elf 39kg</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='shellB12' width='120' dataSort>B12</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='shellB45' width='120' dataSort>B45</TableHeaderColumn>

          <TableHeaderColumn row='0' colSpan='3' csvHeader='Khuyến mãi'
                             headerAlign='center'>Khuyến mãi</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='oil' width='100' dataSort>Dầu</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='sugar' width='120' dataSort>Đường</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='glass' width='100' dataSort>Ly</TableHeaderColumn>
        </BootstrapTable>
    );
  }
}

export default TableExistEnd;