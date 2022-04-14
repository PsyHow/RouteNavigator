import { FC } from "react";

import { Table } from "antd";
import { Resizable } from "re-resizable";

import "./styles/formList.css";

import "antd/dist/antd.css";

import { FormListProps } from "components/FormList/types";

export const FormList: FC<FormListProps> = ({
  handleRowSelect,
  selectCurrentFormClick,
  selectedRow,
  columns,
  rows,
}) => (
  <Resizable className="resize">
    <div className="tableWrapper">
      <Table
        className="table"
        onRow={(record, b) => ({
          onClick: () => {
            handleRowSelect(record);
            selectCurrentFormClick(b);
          },
        })}
        rowClassName={(record) => {
          if (selectedRow) {
            return record.key === selectedRow.key ? "selectedRow" : "";
          }
          return "";
        }}
        columns={columns}
        dataSource={rows}
        pagination={false}
      />
    </div>
  </Resizable>
);
