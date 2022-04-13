import { ChangeEvent, FC, MouseEventHandler } from "react";

import { Row, Select, Table } from "antd";
import { BaseOptionType } from "antd/lib/select";
import { useDispatch, useSelector } from "react-redux";

import style from "./styles/formList.module.scss";

import "antd/dist/antd.css";
import { selectTableList } from "selectors/formList";
import { setCurrentForm } from "store/actions";
import { setCurrentSending, setCurrentArrival } from "store/actions/location";
import { LocationType } from "store/reducers/location";

type RowType = {
  key: number;
  number: number;
  sending: { name: string; locate: number[] };
  arrival: { name: string; locate: number[] };
};

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

  const dispatch = useDispatch();
  const tableList = useSelector(selectTableList);

  const data: RowType[] = tableList.map((el, index) => ({
    key: index,
    number: index + 1,
    sending: el.sending,
    arrival: el.arrival,
  }));

  const handleChange = (value: string, options: BaseOptionType): any => {
    const option = value.split(",").map((item: string) => +item);

    dispatch(setCurrentSending({ name: options.children, locate: option }));
  };

  const handleChange2 = (value: string, options: BaseOptionType): any => {
    const option = value.split(",").map((item: string) => +item);

    dispatch(
      setCurrentArrival(
        { name: options.children, locate: option },
        options.label
      )
    );
  };

  const stopProp = (event: any): void => {
    event.stopPropagation();
  };

  const columns = [
    {
      title: "№",
      dataIndex: "number",
      width: 50,
    },
    {
      title: "Пункт отправки",
      dataIndex: "sending",
      width: 150,
      render: (a: LocationType, b: RowType) => (
        <Select
          onClick={stopProp}
          style={{ minWidth: "200px" }}
          defaultValue={tableList[b.key].sending.name}
          onChange={handleChange}
        >
          {test.map((item) => (
            <Option key={item.id} label={b.key} value={item.locate.join()}>
              {item.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Пункт прибытия",
      dataIndex: "arrival",
      with: 150,
      render: (rows: LocationType, currentRow: RowType) => (
        <Select
          onClick={stopProp}
          style={{ minWidth: "200px" }}
          defaultValue={tableList[currentRow.key].arrival.name}
          onChange={handleChange2}
        >
          {test.map((item) => (
            <Option
              key={item.id}
              label={currentRow.key}
              value={item.locate.join()}
            >
              {item.name}
            </Option>
          ))}
        </Select>
      ),
    },
  ];
  return (
    <Table
      className={style.table}
      onRow={(row) => ({
        onClick: () => {
          dispatch(
            setCurrentForm({
              sending: { ...row.sending },
              arrival: { ...row.arrival },
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
