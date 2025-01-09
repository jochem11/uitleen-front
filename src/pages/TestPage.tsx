import { Button } from "@mui/material";
import Layout from "../layouts/Layout";
import WrappedTestDialog from "../components/test/dialog/Dialog";
import useDialog from "../hooks/useDialog";
import { TEST_DIALOG } from "../constants/dialogInstances";

const TestPage = () => {
  const dialogMethods = useDialog(TEST_DIALOG);

  return (
    <Layout>
      <Button onClick={() => dialogMethods.open()}>aefa</Button>
      <WrappedTestDialog />
    </Layout>
  );
};

export default TestPage;

