import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createAuthSlice } from "./slices/auth-slice";
import { createEventSlice } from "./slices/event-slice";

// const useStore = create(
//   devtools((...state) => ({
//     ...createAuthSlice(...state),
//     ...createEventSlice(...state),
//   }))
// );

const useStore = create(devtools(createAuthSlice));

export default useStore;
