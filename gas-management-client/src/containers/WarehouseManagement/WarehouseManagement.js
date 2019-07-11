import React, {Component} from 'react';
import {
  Row, Col, Card, CardHeader, CardBody,
  Input,
  InputGroup,
  Button,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  FormGroup, FormText,
  Label,
  Modal,
  ModalHeader, ModalBody, ModalFooter, Badge
} from 'reactstrap';
import classnames from 'classnames';
import {DateRangePicker} from "react-dates";
import moment from 'moment';

import {Table, Tag} from 'antd';
import 'antd/dist/antd.css';

const columnsInput = [
  {
    title: <strong>Ngày nhập</strong>,
    dataIndex: 'date',
    key: 'date',
    width: 120,
    fixed: 'left',
  },
  {
    title: <strong>Nhập theo loại</strong>,
    children: [
      {
        title: <strong>Elf Gas</strong>,
        children: [
          {
            title: <strong>Elf 6kg</strong>,
            dataIndex: 'elf6kg',
            key: 'elf6kg',
            width: 100,
            render: elf6kg => {
              return (
                  <span>
                    <Tag color='#f5222d' key={elf6kg}>
                      {elf6kg}
                    </Tag>
                  </span>
                  )
            }
          },
          {
            title: <strong>Elf 12Kg</strong>,
            dataIndex: 'elf12kg',
            key: 'elf12kg',
            width: 100,
            render: elf12kg => {
              return (
                  <span>
                    <Tag color='#f5222d' key={elf12kg}>
                      {elf12kg}
                    </Tag>
                  </span>
              )
            }
          },
          {
            title: <strong>Elf 39Kg</strong>,
            dataIndex: 'elf39kg',
            key: 'elf39kg',
            width: 100,
            render: elf39kg => {
              return (
                  <span>
                    <Tag color='#f5222d' key={elf39kg}>
                      {elf39kg}
                    </Tag>
                  </span>
              )
            }
          },
        ]
      },
      {
        title: <strong>PM</strong>,
        children: [
          {
            title: <strong>B12</strong>,
            dataIndex: 'b12',
            key: 'b12',
            width: 100,
            render: b12 => {
              return (
                  <span>
                    <Tag color='#fa541c' key={b12}>
                      {b12}
                    </Tag>
                  </span>
              )
            }
          },
          {
            title: <strong>B45</strong>,
            dataIndex: 'b45',
            key: 'b45',
            width: 100,
            render: b45 => {
              return (
                  <span>
                    <Tag color='#fa541c' key={b45}>
                      {b45}
                    </Tag>
                  </span>
              )
            }
          },

        ],
      },
      {
        title: <strong>Khác</strong>,
        dataIndex: 'other',
        key: 'other',
        width: 100,
        render: other => {
          return (
            <span>
              <Tag color='#fa8c16' key={other}>
                {other}
              </Tag>
            </span>
          )
        }
      },
      {
        title: <strong>Đơn vị</strong>,
        dataIndex: 'unit',
        key: 'unit',
        width: 100,
        render: unit => {
          return (
            <span>
              <Tag color='#fa8c16' key={unit}>
                {unit}
              </Tag>
            </span>
          )
        }
      },
      {
        title: <strong>Đơn giá</strong>,
        children: [
          {
            title: <strong>Elf 6kg</strong>,
            dataIndex: 'unitPriceElf6kg',
            key: 'unitPriceElf6kg',
            width: 100,
          },
          {
            title: <strong>Elf 12kg</strong>,
            dataIndex: 'unitPriceElf12kg',
            key: 'unitPriceElf12kg',
            width: 100,
          },
          {
            title: <strong>Elf 39kg</strong>,
            dataIndex: 'unitPriceElf39kg',
            key: 'unitPriceElf39kg',
            width: 100,
          },
          {
            title: <strong>B12</strong>,
            dataIndex: 'unitPriceB12',
            key: 'unitPriceB12',
            width: 100,
          },
          {
            title: <strong>B45</strong>,
            dataIndex: 'unitPriceB45',
            key: 'unitPriceB45',
            width: 100,
          },
        ]
      },
      {
        title: <strong>Trả vỏ</strong>,
        children: [
          {
            title: <strong>Elf 6kg</strong>,
            dataIndex: 'payShellElf6kg',
            key: 'payShellElf6kg',
            width: 100,
          },
          {
            title: <strong>Elf 12kg</strong>,
            dataIndex: 'payShellElf12kg',
            key: 'payShellElf12kg',
            width: 100,
          },
          {
            title: <strong>Elf 39kg</strong>,
            dataIndex: 'payShellElf39kg',
            key: 'payShellElf39kg',
            width: 100,
          },
          {
            title: <strong>B12</strong>,
            dataIndex: 'payShellB12',
            key: 'payShellB12',
            width: 100,
          },
          {
            title: <strong>B45</strong>,
            dataIndex: 'payShellB45',
            key: 'payShellB45',
            width: 100,
          },
        ]
      },
    ],
  },
  {
    title: <strong>Nhập KM</strong>,
    children: [
      {
        title: <strong>Dầu</strong>,
        dataIndex: 'oilCooking',
        key: 'oilCooking',
        width: 100,
        render: oilCooking => {
          return (
              <span>
              <Tag color='#7cb305' key={oilCooking}>
                {oilCooking}
              </Tag>
            </span>
          )
        }
      },
      {
        title: <strong>Đường</strong>,
        dataIndex: 'sugar',
        key: 'sugar',
        width: 100,
        render: sugar => {
          return (
              <span>
              <Tag color='#7cb305' key={sugar}>
                {sugar}
              </Tag>
            </span>
          )
        }
      },
      {
        title: <strong>Ly</strong>,
        dataIndex: 'glass',
        key: 'glass',
        width: 100,
        render: glass => {
          return (
              <span>
              <Tag color='#7cb305' key={glass}>
                {glass}
              </Tag>
            </span>
          )
        }
      },
    ],
  },
  {
    title: <strong>Thành tiền</strong>,
    dataIndex: 'totalMoney',
    key: 'totalMoney',
    width: 150,
  },
  {
    title: <strong>Trả tiền</strong>,
    dataIndex: 'payment',
    key: 'payment',
    width: 150,
  },
  {
    title: <strong>Công nợ</strong>,
    children: [
      {
        title: <strong>Tiền</strong>,
        dataIndex: 'debtMoney',
        key: 'debtMoney',
        width: 100,
      },
      {
        title: <strong>Elf 6kg</strong>,
        dataIndex: 'debtElf6kg',
        key: 'debtElf6kg',
        width: 100,
      },
      {
        title: <strong>Elf 12kg</strong>,
        dataIndex: 'debtElf12kg',
        key: 'debtElf12kg',
        width: 100,
      },
      {
        title: <strong>Elf 39kg</strong>,
        dataIndex: 'debtElf39kg',
        key: 'debtElf39kg',
        width: 100,
      },
      {
        title: <strong>B12</strong>,
        dataIndex: 'debtB12',
        key: 'debtB12',
        width: 100,
      },
      {
        title: <strong>B45</strong>,
        dataIndex: 'debtB45',
        key: 'debtB45',
        width: 100,
      },
    ],
  },
];

const dataInput = [];
for (let i = 0; i < 100; i++) {
  dataInput.push({
    key: i,
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
    oilCooking: '100',
    sugar: '200',
    glass: '500',
  });
}

const columnsOutput = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 200,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Address',
        children: [
          {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
            width: 200,
          },
          {
            title: 'Block',
            children: [
              {
                title: 'Building',
                dataIndex: 'building',
                key: 'building',
                width: 100,
              },
              {
                title: 'Door No.',
                dataIndex: 'number',
                key: 'number',
                width: 100,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Company',
    children: [
      {
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
        width: 200,
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
      },
    ],
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    width: 100,
  },
];
const dataOutput = [];
for (let i = 0; i < 100; i++) {
  dataOutput.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  });
}

class WarehouseManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',

    };

    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    let month = moment().format("DD/MM/YYYY");
    let lastMonth = moment().startOf('month').format("DD/MM/YYYY");

    return (
        <div className="animated fadeIn parent-padding">
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
                               }}><strong><i className="fa fa-search"></i> Thông tin kho</strong>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId='1'>
                      <CardBody>
                        <Row>
                          <Col xs={12} sm={12}>
                            <FormGroup>
                              <Label htmlFor="name">Thời gian tìm kiếm</Label>
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
                                        style={{maxWidth: "150px", maxHeight:'50px',marginLeft:'20px',
                                          position:'relative',top:'-10px'}}
                                >
                                  <i className="fa fa-search"></i> Tìm kiếm
                                </Button>
                              </Col>
                              <FormText className="help-block">Tìm kiếm theo tháng.</FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardBody>
                      <CardBody>
                        <Row>
                          <h2 style={{marginLeft:'15px'}}><Badge color='warning'>Nhập kho</Badge></h2>
                          <Button type="submit" color="primary"
                                  style={{marginLeft:'10px',height:'fit-content'}}
                          >
                            <i className="fa fa-plus"/> Lập phiếu nhập kho</Button>
                        </Row>
                          <Table
                              columns={columnsInput}
                              dataSource={dataInput}
                              bordered
                              size="middle"
                              scroll={{ x: '290%', y: 390 }}
                          />
                      </CardBody>
                      <CardBody>
                        <Row>
                          <h2 style={{marginLeft:'15px'}}><Badge color='warning'>Xuất bán</Badge></h2>
                          <Button type="submit" color="primary"
                                  style={{marginLeft:'10px',height:'fit-content'}}
                          >
                            <i className="fa fa-plus"/> Lập hóa đơn bán</Button>
                        </Row>
                          <Table
                              columns={columnsOutput}
                              dataSource={dataOutput}
                              bordered
                              size="middle"
                              scroll={{ x: '130%', y: 240 }}
                          />
                      </CardBody>
                      <CardBody>
                        <Row>
                          <h2 style={{marginLeft:'15px'}}><Badge color='warning'>Tồn cuối</Badge></h2>
                        </Row>
                          <Table
                              columns={columnsOutput}
                              dataSource={dataOutput}
                              bordered
                              size="middle"
                              scroll={{ x: '130%', y: 240 }}
                          />
                      </CardBody>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
    );
  }

}

export default WarehouseManagement;