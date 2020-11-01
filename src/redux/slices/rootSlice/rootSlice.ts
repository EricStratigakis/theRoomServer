import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServerStateT } from "../../../serverTypes";

export const rootSliceGen = (
  initialState: ServerStateT = {
    rooms: [
      {
        roomid: "homeroom",
        users: [{ name: "homie", userid: "homid", online: true }],
        hostid: "homid",
      },
    ],
  }
) => {
  return createSlice({
    name: "rootSlice",
    initialState,
    reducers: {
      // updateUserName(
      //   state: ServerStateT,
      //   action: PayloadAction<updateUserNameActionT>
      // ) {
      //   const { roomid, userid, name } = action.payload;
      //   updateUserNameState(state, roomid, userid, name);
      // },
      // addRoomUsers(
      //   state: ServerStateT,
      //   action: PayloadAction<addRoomUsersActionT>
      // ) {
      //   const { userid, currRoomid, newRoomid } = action.payload;
      //   userJoinsRoomState(state, userid, currRoomid, newRoomid);
      // },
    },
  });
};

const rootSlice = rootSliceGen();
export default rootSlice;
