import React, {PureComponent} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import shallowCompare from 'react-addons-shallow-compare';

class TableOutWarehouse extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tableOutWarehouse: null
    }
  }

  createCustomClearButton = (onClick) => {
    return (
        <button className='btn btn-secondary' onClick={onClick}>Clear</button>
    );
  };

  componentWillMount() {
    let {tableOutWarehouse} = this.props;
    this.setState({
      tableOutWarehouse: tableOutWarehouse
    })
  }

  componentWillReceiveProps(nextProps) {
    if (shallowCompare(this, this.props, nextProps)) {
      this.setState({
        tableOutWarehouse: nextProps.tableOutWarehouse
      })
    }
  }

  render() {
    const {tableOutWarehouse} = this.state;
    const options = {
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton,
      sortIndicator: true,
      hideSizePerPage: true,
    };

    return (
        <BootstrapTable
            data={tableOutWarehouse}
            className="expand-table"
            version="4"
            options={options}
            headerStyle={{backgroundColor: '#43a047'}}
            pagination striped hover condensed
            bodyStyle={{overflow: 'overlay'}}
            search exportCSV>
          <TableHeaderColumn row='0' rowSpan='3' width='50'
                             dataField='invoiceCode' isKey
                             dataSort>ID</TableHeaderColumn>

          <TableHeaderColumn row='0' rowSpan='3' width='150'
                             dataField='dateOut'>Ngày xuất</TableHeaderColumn>
          <TableHeaderColumn row='0' rowSpan='3' width='150'
                             dataField='customer'>Khách hàng</TableHeaderColumn>

          <TableHeaderColumn row='0' colSpan='8' csvHeader='Xuất bán'
                             headerAlign='center'>Xuất bán</TableHeaderColumn>

          <TableHeaderColumn row='1' colSpan='4' csvHeader='Elf Gas'
                             headerAlign='center'>Elf Gas</TableHeaderColumn>
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
                             headerAlign='center'>PM</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='b12' width='90'
                             dataSort>B12</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='b45' width='90'
                             dataSort>B45</TableHeaderColumn>

          <TableHeaderColumn row='1' colSpan='2' csvHeader='Thu Vỏ'
                             headerAlign='center'>Khách hàng nợ
            vỏ</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='regainB12' width='70'
                             dataSort>B12</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='regainB45' width='70'
                             dataSort>B45</TableHeaderColumn>

          <TableHeaderColumn row='0' colSpan='3' csvHeader='Xuất Khuyến mãi'
                             headerAlign='center'>Xuất Khuyến
            mãi</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='oil'
                             width='80'>Dầu</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='sugar'
                             width='90'>Đường</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='glass'
                             width='80'>Ly</TableHeaderColumn>

          <TableHeaderColumn row='0' colSpan='3' csvHeader='Xuất van bếp'
                             headerAlign='center'>Xuất Van,
            Bếp</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='valve'
                             width='120'>Van</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='stove'
                             width='100'>Bếp GĐ</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='torch'
                             width='100'>Bếp Khò</TableHeaderColumn>
        </BootstrapTable>
    );
  }
}

export default TableOutWarehouse;