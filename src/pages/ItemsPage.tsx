import Layout from "../layouts/Layout";
import DataTable from "../components/common/tables/DataTable";
import { Column } from "../types/data-table/Column";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ExampleData {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  itemStatusId: number;
}

const columns: Column<ExampleData>[] = [
  { key: "id", title: "ID" },
  { key: "name", title: "Naam" },
  { key: "description", title: "Bescrijving", render: (value, row) => <strong>{`${row.id}: ${value}`}</strong> },
  {
    key: null,
    title: "Acties",
    actions: (row: ExampleData) => (
      <>
        <IconButton onClick={() => console.log("Edit", row)} size="small" style={{ padding: "0" }}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => console.log("Delete", row)} size="small" style={{ padding: "0" }}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </>
    ),
  },
];

const ItemsPage = () => {
  return (
    <Layout>
      <DataTable<ExampleData> columns={columns} title="Example Table" url={`items/paged`} defaultSortBy="id" />
    </Layout>
  );
};

export default ItemsPage;

