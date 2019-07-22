import {Tag} from "antd";
import React from "react";

export const ColumnExistEnd = [
  {
    title: <strong>Ngày</strong>,
    dataIndex: 'date',
    key: 'date',
    width: 120,
    fixed: 'left',
  },
  {
    title: <strong>Số lượng bình nguyên và vỏ</strong>,
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
        title: <strong>Vỏ</strong>,
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
    title: <strong>Khuyến mãi</strong>,
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
];