import { atom } from "jotai";

export const modalMessageAtom = atom<string | null>(null);

export const isModalOpenAtom = atom<boolean>(false);