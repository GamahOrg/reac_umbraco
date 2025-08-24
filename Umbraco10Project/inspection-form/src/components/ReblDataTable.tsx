import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component/dist/DataTable/types";
import { FileUnknownIcon } from "../Icons.tsx";
import { LoadingSpinner } from "./LoadingSpinn.tsx";

export interface ReblDataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClicked?: (row: T) => void;
  isLoading: boolean;
}

// dear typescript, can you explain yourself <T,> vat is dis?
const ReblDataTable = <T,>({
  columns,
  data,
  onRowClicked,
  isLoading,
}: ReblDataTableProps<T>) => {
  return (
    <DataTable
      columns={columns}
      noDataComponent={
        <div className="m-10 text-center w-100">
          {isLoading && (
            <div className="m-10 text-center">
              <LoadingSpinner loading={true} />
            </div>
          )}
          {!isLoading && (
            <>
              <FileUnknownIcon className="mx-auto" height={40} width={40} />
              <p className="mt-2 text-sm  text-gray-900">
                لا توجد بيانات لعرضها
              </p>
            </>
          )}
        </div>
      }
      data={data}
      customStyles={customStyles}
      highlightOnHover
      pointerOnHover
      onRowClicked={onRowClicked}
    />
  );
};

export default ReblDataTable;

const customStyles = {
  headRow: {
    style: {
      border: "none",
    },
  },
  headCells: {
    style: {
      color: "#202124",
      fontSize: "14px",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "4px",
      outline: "1px solid #FFFFFF",
    },
  },
  pagination: {
    style: {
      border: "none",
    },
  },
};
