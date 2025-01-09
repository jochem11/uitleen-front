import { Switch } from "wouter";
import ApplicationRoute from "./components/common/ApplicationRoute";
import Layout from "./layouts/Layout";
import { lazy } from "react";

const testPage = () => {
  return <Layout>test</Layout>;
};

const ItemsPage = lazy(() => import("./pages/ItemsPage"));
const TestPage = lazy(() => import("./pages/TestPage"));

function AuthenticatedLayoutRoutes() {
  return (
    <Switch>
      <ApplicationRoute path="/" component={testPage} />
      <ApplicationRoute path="/items" component={ItemsPage} />
      <ApplicationRoute path="/test" component={TestPage} />
    </Switch>
  );
}

//TODO: useAuth with check what routes to return
function UnauthenticatedLayoutRoutes() {}

const Routes = () => {
  return <AuthenticatedLayoutRoutes />;
};

export default Routes;

