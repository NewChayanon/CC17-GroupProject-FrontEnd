import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createAuthSlice } from "./slices/auth-slice";
import { createEventSlice } from "./slices/event-slice";
import { createStoreSlice } from "./slices/store-slice";
import { createMyStoreSlice } from "./slices/my-store-slice";
import { createAdminSlice } from "./slices/admin-slice";

const useStore = create(
  devtools((...state) => ({
    ...createAuthSlice(...state),
    ...createEventSlice(...state),
    ...createStoreSlice(...state),
    ...createMyStoreSlice(...state),
    ...createAdminSlice(...state),
  }))
);

export default useStore;
