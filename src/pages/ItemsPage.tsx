import Layout from "../layouts/Layout";
import DataTable from "../components/common/tables/DataTable";
import { Column } from "../types/data-table/Column";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WrappedCreateItemDialog from "../components/items/create-dialog/CreateItemDialog";
import useDialog from "../hooks/useDialog";
import { ITEM_CREATE_DIALOG, ITEM_DELETE_DIALOG, ITEM_EDIT_DIALOG } from "../constants/dialogInstances";
import WrappedDeleteItemDialog from "../components/items/delete-dialog/DeleteItemDialog";
import WrappedEditItemDialog, { EditItemDialogProps } from "../components/items/edit-dialog/EditItemDialog";
import { GetItemsResponse } from "../types/responses/GetItemsResponse";

const ItemsPage = () => {
  const createItemDialogMethods = useDialog(ITEM_CREATE_DIALOG);
  const deleteItemDialogMethods = useDialog(ITEM_DELETE_DIALOG);
  const editItemDialogMethods = useDialog<EditItemDialogProps>(ITEM_EDIT_DIALOG);

  const columns: Column<GetItemsResponse>[] = [
    { key: "id", title: "ID" },
    { key: "name", title: "Naam" },
    { key: "description", title: "Bescrijving", render: (value, row) => <strong>{`${row.id}: ${value}`}</strong> },
    {
      key: null,
      title: "Acties",
      actions: (row) => (
        <>
          <IconButton
            onClick={() =>
              editItemDialogMethods.open({
                props: {
                  id: row.id,
                  name: row.name,
                  description: row.description,
                  categoryId: row.caterogyId,
                  itemStatusId: row.itemStatusId,
                },
              })
            }
            size="small"
            style={{ padding: "0" }}
          >
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
      <DataTable<GetItemsResponse>
        tableActions={<Button onClick={() => createItemDialogMethods.open()}>Maak item</Button>}
        columns={columns}
        title="Items"
        url={`items/paged`}
        defaultSortBy="id"
      />
      <WrappedCreateItemDialog />
      <WrappedDeleteItemDialog />
      <WrappedEditItemDialog />
    </Layout>
  );
};

export default ItemsPage;

