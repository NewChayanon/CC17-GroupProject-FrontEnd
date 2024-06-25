import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createAuthSlice } from "./slices/auth-slice";

const useStore = create(devtools(createAuthSlice));

export default useStore;
