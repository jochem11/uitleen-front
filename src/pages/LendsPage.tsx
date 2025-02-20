import { Button, IconButton } from "@mui/material";
import Layout from "../layouts/Layout";
import { Column } from "../types/data-table/Column";
import GetLendsResponse from "../types/responses/GetLendsResponse";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "../components/common/tables/DataTable";
import WrappedCreateLendDialog from "../components/lends/create/CreateLendDialog";
import useDialog from "../hooks/useDialog";
import { LEND_CREATE_DIALOG, LEND_EDIT_DIALOG } from "../constants/dialogInstances";
import WrappedEditLendDialog, { EditLendDialogProps } from "../components/lends/edit/EditLendDialog";

const LendsPage = () => {
  const createLendDialogMethods = useDialog(LEND_CREATE_DIALOG);
  const editLendDialogMethods = useDialog<EditLendDialogProps>(LEND_EDIT_DIALOG);

  const columns: Column<GetLendsResponse>[] = [
    { key: "id", title: "ID" },
    { key: "accountId", title: "Gebruiker ID" },
    { key: "itemId", title: "Item ID" },
    { key: "lendDate", title: "Uitleendatum" },
    { key: "returnDate", title: "Terugbrengdatum" },
    {
      key: null,
      title: "Acties",
      actions: (row) => (
        <>
          <IconButton
            onClick={() =>
              editLendDialogMethods.open({
                props: {
                  id: row.id,
                  accountId: row.accountId,
                  itemId: row.itemId,
                  lendDate: row.lendDate,
                  returnDate: row.returnDate,
                },
              })
            }
            size="small"
            style={{ padding: "0" }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => {}} size="small" style={{ padding: "0" }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <DataTable<GetLendsResponse>
        tableActions={<Button onClick={() => createLendDialogMethods.open()}>Maak uitgiften</Button>}
        columns={columns}
        title="Uitgiften"
        url="lends/paged"
      />
      <WrappedCreateLendDialog />
      <WrappedEditLendDialog />
    </Layout>
  );
};

export default LendsPage;

