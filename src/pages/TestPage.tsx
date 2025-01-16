import { Button } from "@mui/material";
import Layout from "../layouts/Layout";
import WrappedTestDialog from "../components/test/dialog/Dialog";
import { toast } from "react-toastify";
// import { useSnackbar } from "notistack";

const TestPage = () => {
  //   const dialogMethods = useDialog(TEST_DIALOG);

  // const {enqueueSnackbar} = useSnackbar();

  return (
    <Layout>
      <Button
        onClick={() => {
          toast.success("aaa");
        }}
      >
        aefa
      </Button>
      <WrappedTestDialog />
    </Layout>
  );
};

export default TestPage;
