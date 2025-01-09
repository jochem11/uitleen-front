import { ComponentType } from "react";

import useDialog, { UseDialogResponse } from "../../../hooks/useDialog";


export type DialogContainer<T = undefined> = {
  dialogMethods: T extends undefined ? UseDialogResponse<null> : UseDialogResponse<T>;
};

type DialogWrapperProps<T> = {
  instance: string;
  dialogComponent: ComponentType<DialogContainer<T>>;
};

export default function DialogWrapper<_, T>({ instance, dialogComponent: DialogComponent }: DialogWrapperProps<T>) {
  const dialogMethods = useDialog<T>(instance);

  if (!dialogMethods.isOpen) return null;

  //@ts-ignore
  return <DialogComponent dialogMethods={dialogMethods} />;
}