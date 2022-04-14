/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { FC, useState } from "react";

import { Select, Table } from "antd";
import { BaseOptionType } from "antd/lib/select";
import { Resizable } from "re-resizable";
import { useDispatch, useSelector } from "react-redux";

import "./styles/formList.css";

import "antd/dist/antd.css";
import { selectCurrentList, selectTableList } from "selectors/formList";
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
  const currentFormList = useSelector(selectCurrentList);

  const data: RowType[] = tableList.map((el, index) => ({
    key: index,
    number: index + 1,
    sending: el.sending,
    arrival: el.arrival,
  }));

  const handleChange = (value: string, options: BaseOptionType): any => {
    const option = value.split(",").map((item: string) => +item);

    dispatch(
      setCurrentSending(
        { name: options.children, locate: option },
        options.label
      )
    );

    dispatch(
      setCurrentForm({
        sending: { name: options.children, locate: option },
        arrival: { ...currentFormList.arrival },
      })
    );
  };

  const handleChange2 = (value: string, options: BaseOptionType): any => {
    const option = value.split(",").map((item: string) => +item);

    dispatch(
      setCurrentArrival(
        { name: options.children, locate: option },
        options.label
      )
    );

    dispatch(
      setCurrentForm({
        sending: { ...currentFormList.sending },
        arrival: { name: options.children, locate: option },
      })
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
      render: (rows: LocationType, currentRow: RowType) => (
        <Select
          onClick={stopProp}
          style={{ minWidth: "200px" }}
          defaultValue={tableList[currentRow.key].sending.name}
          onChange={handleChange}
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

  const [selectedRow, setSelectedRow] = useState<RowType | undefined>(
    undefined
  );

  const handleRowSelect = (record: RowType): void => {
    if (selectedRow === undefined) {
      setSelectedRow(record);
    } else if (selectedRow.key === record.key) {
      setSelectedRow(undefined);
    } else {
      setSelectedRow(record);
    }
  };

  return (
    <Resizable
      className="resize"
      // defaultSize={{
      //   width: 500,
      //   height: 500,
      // }}
    >
      <Table
        className="table"
        onRow={(record, b) => ({
          onClick: () => {
            handleRowSelect(record);
            dispatch(
              setCurrentForm({
                sending: {
                  locate: tableList[b as number].sending.locate,
                  name: tableList[b as number].sending.name,
                },
                arrival: {
                  locate: tableList[b as number].arrival.locate,
                  name: tableList[b as number].arrival.name,
                },
              })
            );
          },
        })}
        rowClassName={(record) => {
          if (selectedRow) {
            return record.key === selectedRow.key ? "selectedRow" : "";
          }
          return "";
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </Resizable>
  );
};
