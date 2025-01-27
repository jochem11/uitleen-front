import { Button, IconButton } from "@mui/material";
import Layout from "../layouts/Layout";
import { Column } from "../types/data-table/Column";
import { GetUsersResponse } from "../types/responses/GetUsersResponse";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "../components/common/tables/DataTable";
import useDialog from "../hooks/useDialog";
import { USER_CREATE_DIALOG, USER_DELETE_DIALOG, USER_EDIT_DIALOG } from "../constants/dialogInstances";
import WrappedCreateUserDialog from "../components/users/create-dialog/CreateUserDialog";
import WrappedDeleteUserDialog from "../components/users/delete-dialog/DeleteUserDialog";
import WrappedEditUserDialog, { EditUserDialogProps } from "../components/users/edit-dialog/EditUserDialog";

const UsersPage = () => {
  const createUserDialogMethods = useDialog(USER_CREATE_DIALOG);
  const deleteUserDialogMethods = useDialog(USER_DELETE_DIALOG);
  const editUserDialogMethods = useDialog<EditUserDialogProps>(USER_EDIT_DIALOG);

  const columns: Column<GetUsersResponse>[] = [
    { key: "id", title: "ID" },
    { key: "displayName", title: "Naam" },
    { key: "cardNumber", title: "Kaartnummer" },
    { key: "groupId", title: "Klas ID" },
    { key: "courseId", title: "Opleiding ID" },
    {
      key: null,
      title: "Acties",
      actions: (row) => (
        <>
          <IconButton
            onClick={() =>
              editUserDialogMethods.open({
                props: {
                  id: row.id,
                  firstname: row.firstname,
                  insertion: row.insertion,
                  lastname: row.lastname,
                  email: row.email,
                  cardNumber: row.cardNumber,
                  courseId: row.courseId,
                  groupId: row.groupId,
                },
              })
            }
            size="small"
            style={{ padding: "0" }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => deleteUserDialogMethods.open({ props: { id: row.id } })}
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
      <DataTable<GetUsersResponse>
        columns={columns}
        title="Gebruikers"
        url="accounts/paged"
        defaultSortBy="id"
        defaultSortDir="asc"
        defaultRowsPerPage={20}
        tableActions={<Button onClick={() => createUserDialogMethods.open()}>Maak gebruiker</Button>}
      />
      <WrappedCreateUserDialog />
      <WrappedDeleteUserDialog />
      <WrappedEditUserDialog />
    </Layout>
  );
};

export default UsersPage;

