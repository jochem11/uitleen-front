import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  CircularProgress,
} from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { Column } from "../../../types/data-table/Column";
import { PagedResponse } from "../../../types/responses/PagedResponse";


type DataTableProps<T> = {
  columns: Column<T>[];
  title?: string;
  url: string;
  defaultSortBy?: string;
  defaultSortDir?: "asc" | "desc";
  defaultRowsPerPage?: number;
};


function DataTable<T extends object>({
  columns,
  title,
  url,
  defaultSortBy = "id",
  defaultSortDir = "asc",
  defaultRowsPerPage = 20,
}: DataTableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [sortBy, setSortBy] = useState(defaultSortBy);
  const [sortDir, setSortDir] = useState<"asc" | "desc">(defaultSortDir);

  const { data, isLoading, error } = useFetch<PagedResponse<T>>(url, {
    page,
    size: rowsPerPage,
    sortBy,
    sortDir,
  });

  const handleSort = (key: keyof T) => {
    if (sortBy === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key as string);
      setSortDir("asc");
    }
  };

  return (
    <Paper>
      {title && <h2 style={{ textAlign: "center" }}>{title}</h2>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} align={column.actions ? "right" : "left"}>
                  {column.key ? (
                    <TableSortLabel
                      active={sortBy === column.key}
                      direction={sortBy === column.key ? sortDir : "asc"}
                      onClick={() => handleSort(column.key!)}
                    >
                      {column.title}
                    </TableSortLabel>
                  ) : (
                    column.title
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data?.content.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex} align={column.actions ? "right" : "left"}>
                      {column.render
                        ? column.render(row[column.key!], row)
                        : column.actions
                        ? column.actions(row)
                        : String(row[column.key!])}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50]}
        component="div"
        count={data?.totalElements || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
}

export default DataTable;