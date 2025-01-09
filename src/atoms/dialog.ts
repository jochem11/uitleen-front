import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

export type DialogAtomMetaType<T> = T extends undefined
  ? {
      onClose?: Array<() => void>;
    }
  : {
      props: T;
      onClose?: Array<() => void>;
    };

export type DialogAtomType<T = undefined> = {
  meta: DialogAtomMetaType<T>;
} & {
  instance?: string;
  isOpen: boolean;
};

export default atomFamily((key: string) =>
  atom<DialogAtomType<undefined>>({
    instance: key,
    isOpen: false,
    meta: {},
  }),
);