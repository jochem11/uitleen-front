import { atom } from "jotai";

export default atom(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? true : false);

