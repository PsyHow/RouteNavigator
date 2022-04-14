import { ColumnGroupType, ColumnType } from "antd/lib/table";

export interface FormListProps {
  handleRowSelect: (record: RowType) => void;
  selectCurrentFormClick: (currentRow: number | undefined) => void;
  selectedRow: RowType | undefined;
  columns: (ColumnGroupType<any> | ColumnType<any>)[];
  rows: RowType[];
}

export interface RowType {
  key: number;
  number: number;
  sending: { name: string; locate: number[] };
  arrival: { name: string; locate: number[] };
}
