import { FC } from "react";

import { Select, Table } from "antd";

import style from "./styles/formList.module.scss";

import "antd/dist/antd.css";

const test = [
  { id: 1, name: "1st" },
  { id: 2, name: "2nd" },
  { id: 3, name: "3rd" },
];

export const FormList: FC = () => {
  const { Option } = Select;

  const handleChange = (value: any): any => {
    console.log(`selected ${value}`);
  };

  const columns = [
    {
      title: "№",
      dataIndex: "key",
      width: 50,
    },
    {
      title: "Пункт отправки",
      dataIndex: "sending",
      width: 150,
      render: () => (
        <Select defaultValue="1st" onChange={handleChange}>
          {test.map((item) => (
            <Option key={item.id}>{item.name}</Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Пункт прибытия",
      dataIndex: "arrival",
    },
  ];

  const data = [
    {
      key: 1,
      sending: "",
      arrival: "Астана, Назарабаева 54",
    },
    {
      key: 2,
      sending: "",
      arrival: "Алматы, Машхур-Жусупа 34",
    },
  ];

  return (
    <Table
      className={style.table}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};
