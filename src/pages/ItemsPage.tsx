import Layout from "../layouts/Layout";
import DataTable from "../components/common/tables/DataTable";
import { Column } from "../types/data-table/Column";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WrappedCreateItemDialog from "../components/items/create-dialog/CreateItemDialog";
import useDialog from "../hooks/useDialog";
import { ITEM_CREATE_DIALOG, ITEM_DELETE_DIALOG, ITEM_EDIT_DIALOG } from "../constants/dialogInstances";
import WrappedDeleteItemDialog from "../components/items/delete-dialog/DeleteItemDialog";
import WrappedEditDialog, { EditDialogProps } from "../components/items/edit-dialog/EditItemDialog";

interface ExampleData {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  itemStatusId: number;
}

const ItemsPage = () => {
  const createItemDialogMethods = useDialog(ITEM_CREATE_DIALOG);
  const deleteItemDialogMethods = useDialog(ITEM_DELETE_DIALOG);
  const editItemDialogMethods = useDialog<EditDialogProps>(ITEM_EDIT_DIALOG);

  const columns: Column<ExampleData>[] = [
    { key: "id", title: "ID" },
    { key: "name", title: "Naam" },
    { key: "description", title: "Bescrijving", render: (value, row) => <strong>{`${row.id}: ${value}`}</strong> },
    {
      key: null,
      title: "Acties",
      actions: (row: ExampleData) => (
        <>
          <IconButton onClick={() => editItemDialogMethods.open({ props: row })} size="small" style={{ padding: "0" }}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => deleteItemDialogMethods.open({ props: { id: row.id } })}
            size="small"
            style={{ padding: "0" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <DataTable<ExampleData> columns={columns} title="Example Table" url={`items/paged`} defaultSortBy="id" />
      <WrappedCreateItemDialog />
      <WrappedDeleteItemDialog />
      <WrappedEditDialog />
    </Layout>
  );
};

export default ItemsPage;

