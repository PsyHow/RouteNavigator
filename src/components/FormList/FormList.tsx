/* eslint-disable @typescript-eslint/no-magic-numbers */
import { ChangeEvent, FC, useState } from "react";

import { Select, Table } from "antd";

import style from "./styles/formList.module.scss";

import "antd/dist/antd.css";
import { useDispatch } from "react-redux";

import { setCurrentForm } from "store/actions";

const test = [
  { id: 1, name: "Новосибирск", locate: [54.96781445, 82.95159894278376] },
  { id: 2, name: "Москва", locate: [55.7504461, 37.6174943] },
  { id: 3, name: "Омск", locate: [54.991375, 73.371529] },
  {
    id: 4,
    name: "Санкт-Петербург",
    locate: [59.917857350000006, 30.380619357025516],
  },
];

export const FormList: FC = () => {
  const { Option } = Select;

  const handleChange = (name: any, value: any[]): any => {
    console.log(name);
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
        <Select
          style={{ minWidth: "200px" }}
          defaultValue={test[0].locate}
          onChange={handleChange}
        >
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
