import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route } from "wouter";
import ErrorPage from "../../pages/ErrorPage";
import LoadingPage from "../../pages/LoadingPage";

type Props = {
  path: string;
  component: any;
};

const ApplicationRoute = ({ path, component: Component }: Props) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <Suspense fallback={<LoadingPage />}>
        <Route path={path} component={Component} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ApplicationRoute;

