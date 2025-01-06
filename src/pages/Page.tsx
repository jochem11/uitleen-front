import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

type Props = {
  title?: string;
  titlePostfix?: string;
  children: ReactNode;
};

const Page = ({ title = "", titlePostfix = "", children }: Props) => {
  return (
    <>
      <Helmet>
        <title>
          {title} {titlePostfix}
        </title>
      </Helmet>
      {children}
    </>
  );
};

export default Page;

