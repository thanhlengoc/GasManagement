import {Tag} from "antd";
import React from "react";

export const columnsExport = [
  {
    title: <strong>Ngày Bán</strong>,
    dataIndex: 'date',
    key: 'date',
    width: 120,
    fixed: 'left',
  },
  {
    title: <strong>Khách hàng</strong>,
    dataIndex: 'customer',
    key: 'customer',
    width: 120,
  },
  {
    title: <strong>Số lượng và giá bán theo loại</strong>,
    children: [
      {
        title: <strong>Elf Gas</strong>,
        children: [
          {
            title: <strong>Elf 6kg</strong>,
            dataIndex: 'elf6kg',
            key: 'elf6kg',
            width: 100,
          },
          {
            title: <strong>Elf 12Kg</strong>,
            dataIndex: 'elf12kg',
            key: 'elf12kg',
            width: 100,
          },
          {
            title: <strong>Elf 39Kg</strong>,
            dataIndex: 'elf39kg',
            key: 'elf39kg',
            width: 100,
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
          },
          {
            title: <strong>B45</strong>,
            dataIndex: 'b45',
            key: 'b45',
            width: 100,
          },

        ],
      },
      {
        title: <strong>Khác</strong>,
        dataIndex: 'other',
        key: 'other',
        width: 100,
      },
      {
        title: <strong>Đơn vị</strong>,
        dataIndex: 'unit',
        key: 'unit',
        width: 100,
      },
      {
        title: <strong>Đơn giá bán</strong>,
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
        title: <strong>Thu vỏ</strong>,
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
    title: <strong>Xuất KM</strong>,
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
    title: <strong>Khách hàng nợ</strong>,
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