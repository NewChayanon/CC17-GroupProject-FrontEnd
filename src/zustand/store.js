import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createAuthSlice } from "./slices/auth-slice";
import { createEventSlice } from "./slices/event-slice";
import { createStoreSlice } from "./slices/store-slice";

const useStore = create(
  devtools((...state) => ({
    ...createAuthSlice(...state),
    ...createEventSlice(...state),
    ...createStoreSlice(...state),
  }))
);

export default useStore;
