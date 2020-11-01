"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = (state, { userid, name, roomid }) => {
    if (userid === "homid") {
        return new apollo_server_1.ApolloError("homid can never leave the homeroom, so cant generate a new room");
    }
    const newRoom = {
        roomid,
        hostid: userid,
        users: [
            {
                userid,
                name,
                online: true,
            },
        ],
    };
    state.rooms.push(newRoom);
    state.rooms = state.rooms.map((r) => {
        if (r.roomid === "homeroom") {
            return Object.assign(Object.assign({}, r), { users: r.users.filter((u) => u.userid !== userid) });
        }
        return r;
    });
    const roomsOfInterest = state.rooms.filter((room) => room.roomid === newRoomid);
    if (roomsOfInterest.length > 1) {
        return new apollo_server_1.ApolloError("can only generate new room from home room");
    }
    if (roomsOfInterest.length === 0) {
        return new apollo_server_1.ApolloError("problem with the room generation");
    }
    return roomsOfInterest[0];
};
//# sourceMappingURL=generateNewRoomMutation.js.map