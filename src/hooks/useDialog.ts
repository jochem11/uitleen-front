import { useAtom } from "jotai";

import dialogAtom, { DialogAtomMetaType, DialogAtomType } from "../atoms/dialog";
import { BasicEntityDialogType } from "../types/dialogs/BasicDialogTypes";

export type UseDialogResponse<T = undefined> = {
  open: (meta?: T extends undefined ? DialogAtomMetaType<undefined> : DialogAtomMetaType<T>) => void;
  close: () => void;
} & DialogAtomType<T>;

export default function useDialog<T = BasicEntityDialogType>(instance: string): UseDialogResponse<T | undefined> {
  const [dialogState, setDialogState] = useAtom(dialogAtom(instance));

  const open = (meta?: T extends undefined ? DialogAtomMetaType<undefined> : DialogAtomMetaType<T>) => {
    setDialogState({ ...dialogState, isOpen: true, meta: meta as DialogAtomMetaType<T> });
  };

  const close = () => {
    setDialogState({ ...dialogState, isOpen: false });
    dialogState.meta?.onClose?.forEach((f) => {
        if(f)f()
    });

};

  return { open, close, ...dialogState } as UseDialogResponse<T | undefined>;
}