import { configureStore } from "@reduxjs/toolkit";
import { rootSliceGen } from "./slices/rootSlice/rootSlice";

import thunk from "redux-thunk";
import logger from "redux-logger";
import { ServerStateT } from "../serverTypes";

export const storeGen = (
  rootState: ServerStateT = {
    rooms: [
      {
        roomid: "homeroom",
        users: [{ name: "homie", userid: "homid", online: true }],
        hostid: "homid",
      },
    ],
  }
) =>
  configureStore({
    reducer: {
      root: rootSliceGen(rootState).reducer,
      // test: testSlice.reducer,
    },
    middleware: [thunk, logger],
  });

const store = storeGen();
export type AppDispatch = typeof store.dispatch;
export type StoreT = typeof store;

export default store;
