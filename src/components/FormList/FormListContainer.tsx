import { FC, useState } from "react";

import { Select } from "antd";
import { BaseOptionType } from "antd/lib/select";
import { useSelector, useDispatch } from "react-redux";

import { FormList } from "components/FormList";
import { RowType } from "components/FormList/types";
import { selectFormList, selectCurrentList } from "selectors/formList";
import {
  sagaSelectForm,
  sagaSetCurrentArrival,
  sagaSetCurrentSending,
} from "store/middlewares/location";
import { LocationType } from "store/reducers/types";

import "./styles/formList.css";

import "antd/dist/antd.css";

const selectedOptions = [
  { id: 1, name: "Новосибирск", locate: [54.96781445, 82.95159894278376] },
  { id: 2, name: "Москва", locate: [55.7504461, 37.6174943] },
  { id: 3, name: "Омск", locate: [54.991375, 73.371529] },
  {
    id: 4,
    name: "Санкт-Петербург",
    locate: [59.917857350000006, 30.380619357025516],
  },
];

export const FormListContainer: FC = () => {
  const { Option } = Select;

  const dispatch = useDispatch();
  const formList = useSelector(selectFormList);
  const currentFormList = useSelector(selectCurrentList);

  const [selectedRow, setSelectedRow] = useState<RowType | undefined>(
    undefined
  );

  const rows: RowType[] = formList.map((el, index) => ({
    key: index,
    number: index + 1,
    sending: el.sending,
    arrival: el.arrival,
  }));

  const handleSendingChange = (value: string, options: BaseOptionType): any => {
    const option = value.split(",").map((item: string) => +item);

    dispatch(
      sagaSetCurrentSending(
        { name: options.children, locate: option },
        options.label
      )
    );

    dispatch(
      sagaSelectForm({
        sending: { name: options.children, locate: option },
        arrival: { ...currentFormList.arrival },
      })
    );
  };

  const handleArrivalChange = (value: string, options: BaseOptionType): any => {
    const option = value.split(",").map((item: string) => +item);

    dispatch(
      sagaSetCurrentArrival(
        { name: options.children, locate: option },
        options.label
      )
    );

    dispatch(
      sagaSelectForm({
        sending: { ...currentFormList.sending },
        arrival: { name: options.children, locate: option },
      })
    );
  };

  const handleStopPropagation = (event: any): void => {
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
          onClick={handleStopPropagation}
          style={{ minWidth: "200px" }}
          defaultValue={formList[currentRow.key].sending.name}
          onChange={handleSendingChange}
        >
          {selectedOptions.map((item) => (
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
          onClick={handleStopPropagation}
          style={{ minWidth: "200px" }}
          defaultValue={formList[currentRow.key].arrival.name}
          onChange={handleArrivalChange}
        >
          {selectedOptions.map((item) => (
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

  const selectCurrentFormClick = (currentRow: any): void => {
    dispatch(
      sagaSelectForm({
        sending: {
          locate: formList[currentRow as number].sending.locate,
          name: formList[currentRow as number].sending.name,
        },
        arrival: {
          locate: formList[currentRow as number].arrival.locate,
          name: formList[currentRow as number].arrival.name,
        },
      })
    );
  };

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
    <FormList
      handleRowSelect={handleRowSelect}
      selectCurrentFormClick={selectCurrentFormClick}
      selectedRow={selectedRow}
      columns={columns}
      rows={rows}
    />
  );
};
