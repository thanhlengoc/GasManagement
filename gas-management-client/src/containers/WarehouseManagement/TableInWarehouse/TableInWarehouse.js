import React, {Component} from 'react';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

class CustomInsertModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }


  render() {

    return (
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
    );
  }
}


class TableInWarehouse extends Component {
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
        unitPriceElf6kg: '240,000',
        unitPriceElf12kg: '12,360,000',
        unitPriceElf39kg: '420,000',
        unitPriceB12: '15,360,000',
        unitPriceB45: '230,000',
        oil: '100',
        sugar: '200',
        glass: '500',
      })
    }

    return (
        <BootstrapTable
            data={ products }
            className="expand-table"
            options={options}
            headerStyle={{backgroundColor:'#20a8d8'}}
            selectRow={ selectRow }
            pagination striped hover condensed
            bodyStyle={{overflow: 'overlay'}}
            search deleteRow exportCSV>
          <TableHeaderColumn row='0' rowSpan='3' width='50' dataField='id' isKey hiddenOnInsert>ID</TableHeaderColumn>

          <TableHeaderColumn row='0' rowSpan='3' width='150' dataField='date'>Ngày Nhập</TableHeaderColumn>

          <TableHeaderColumn row='0' colSpan='12' csvHeader='Nhập theo loại'
                             headerAlign='center' hiddenOnInsert>Nhập theo loại</TableHeaderColumn>

          <TableHeaderColumn row='1' colSpan='3' csvHeader='Elf Gas'
                             headerAlign='center' hiddenOnInsert>Elf Gas</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='elf6kg' width='100' dataAlign='center'>Elf 6kg</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='elf12kg' width='100' dataSort>Elf 12kg</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='elf39kg' width='100'>Elf 39kg</TableHeaderColumn>

          <TableHeaderColumn row='1' colSpan='2' csvHeader='PM'
                             headerAlign='center' hiddenOnInsert>PM</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='b12' width='90'>B12</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='b45' width='90'>B45</TableHeaderColumn>

          <TableHeaderColumn row='1' rowSpan='2' dataField='other' width='150'>Khác</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='unit' width='150'>Đơn vị</TableHeaderColumn>

          <TableHeaderColumn row='1' colSpan='5' csvHeader='Trả Vỏ'
                             headerAlign='center' hiddenOnInsert>Trả Vỏ</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='payShellElf6kg' width='80'>Elf 6kg</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='payShellElf12kg' width='90'>Elf 12kg</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='payShellElf39kg' width='90'>Elf 39kg</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='payShellB12' width='70'>B12</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='payShellB45' width='70'>B45</TableHeaderColumn>

          <TableHeaderColumn row='0' colSpan='3' csvHeader='Nhập Khuyến mãi'
                             headerAlign='center' hiddenOnInsert>Nhập Khuyến mãi</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='oil' width='80'>Dầu</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='sugar' width='90'>Đường</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='glass' width='80'>Ly</TableHeaderColumn>

          <TableHeaderColumn row='0' rowSpan='3' width='150' dataField='totalMoney'>Thành tiền</TableHeaderColumn>
          <TableHeaderColumn row='0' rowSpan='3' width='150' dataField='payment'>Trả tiền</TableHeaderColumn>

          <TableHeaderColumn row='0' colSpan='6' csvHeader='Công nợ'
                             headerAlign='center' hiddenOnInsert>Công nợ</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='debtMoney' width='120' hiddenOnInsert>Tiền</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='debtElf6kg' width='120' hiddenOnInsert>Vỏ Elf 6kg</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='debtElf12kg' width='120' hiddenOnInsert>Vỏ Elf 12kg</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='debtElf39kg' width='120' hiddenOnInsert>Vỏ Elf 39kg</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='debtB12' width='100' hiddenOnInsert>Vỏ B12</TableHeaderColumn>
          <TableHeaderColumn row='1' rowSpan='2' dataField='debtB45' width='100' hiddenOnInsert>Vỏ B45</TableHeaderColumn>
        </BootstrapTable>
    );
  }
}

export default TableInWarehouse;