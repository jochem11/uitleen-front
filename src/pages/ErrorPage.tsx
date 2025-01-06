import { FallbackProps } from "react-error-boundary";
import Page from "./Page";

const ErrorPage = ({ error }: FallbackProps) => {
  return <Page>{error?.message}</Page>;
};

export default ErrorPage;

