"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootSliceGen = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.rootSliceGen = (initialState = {
    rooms: [
        {
            roomid: "homeroom",
            users: [{ name: "homie", userid: "homid", online: true }],
            hostid: "homid",
        },
    ],
}) => {
    return toolkit_1.createSlice({
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
const rootSlice = exports.rootSliceGen();
exports.default = rootSlice;
//# sourceMappingURL=rootSlice.js.map