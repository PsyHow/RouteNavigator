import { FC, memo } from "react";

import { Table } from "antd";
import { Resizable } from "re-resizable";

import "./styles/formList.css";

import "antd/dist/antd.css";

import { FormListProps } from "components/FormList/types";

export const FormList: FC<FormListProps> = memo(
  ({ handleRowSelect, selectCurrentFormClick, selectedRow, columns, rows }) => (
    <Resizable className="resize">
      <div className="tableWrapper">
        <Table
          className="table"
          onRow={(record, rowIndex) => ({
            onClick: () => {
              handleRowSelect(record);
              selectCurrentFormClick(rowIndex as number);
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
  )
);
