// ToastProvider.js
import { useAtomValue } from "jotai";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import darkModeAtom from "./atoms/darkmode";

type Props = {
  children: ReactNode;
};

const ToastProvider = ({ children }: Props) => {
  const darkMode = useAtomValue(darkModeAtom);

  return (
    <>
      {children}
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        theme={darkMode ? "dark" : "light"}
      />
    </>
  );
};

export default ToastProvider;

