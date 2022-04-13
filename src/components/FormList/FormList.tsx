/* eslint-disable @typescript-eslint/no-magic-numbers */
import { FC } from "react";

import { Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";

import style from "./styles/formList.module.scss";

import "antd/dist/antd.css";
import { setCurrentForm } from "store/actions";
import { AppRootStoreType } from "store/store";

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

const task1: TaskType = {
  sending: { name: "Москва", locate: [55.7504461, 37.6174943] },
  arrival: { name: "Новосибирск", locate: [54.96781445, 82.95159894278376] },
};

type TaskType = {
  sending: { name: string; locate: number[] };
  arrival: { name: string; locate: number[] };
};

export const FormList: FC = () => {
  const { Option } = Select;
  const dispatch = useDispatch();

  const tasks = useSelector<AppRootStoreType, any>(
    (st) => st.locationReducer.tableList
  );

  console.log(tasks);

  const handleChange = (value: any): void => {
    console.log(value);
    // console.log(event.currentTarget.value.split(",").map((i) => +i));
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
          defaultValue={test[0].name}
          onChange={handleChange}
        >
          {test.map((item) => (
            <Option key={item.id} value={item.locate.join()}>
              {item.name}
            </Option>
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
      sending: task1.sending,
      arrival: task1.arrival,
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
      onRow={(row) => ({
        onClick: () => {
          // @ts-ignore
          console.log(row.arrival.name);

          dispatch(
            setCurrentForm({
              arrival: {
                // @ts-ignore
                name: row.arrival.name,
                // @ts-ignore
                locate: row.arrival.locate,
              },
              sending: {
                // @ts-ignore
                name: row.sending.name,
                // @ts-ignore
                locate: row.sending.locate,
              },
            })
          );
        },
      })}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};
