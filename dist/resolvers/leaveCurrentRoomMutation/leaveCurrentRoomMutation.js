"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = (state, { userid, name, roomid }) => {
    if (roomid == "homeroom") {
        return new apollo_server_1.ApolloError("nobody can leave the home room");
    }
    if (userid === "homid") {
        return new apollo_server_1.ApolloError("homid can never leave the homeroom, so cant join an existing room");
    }
    if (state.rooms.filter((r) => r.roomid === roomid).length == 0) {
        return new apollo_server_1.ApolloError("trying to join room that does not exist");
    }
    state.rooms = state.rooms.map((r) => {
        if (r.roomid === roomid) {
            return Object.assign(Object.assign({}, r), { users: r.users.filter((u) => u.userid !== userid) });
        }
        if (r.roomid === "homeroom") {
            return Object.assign(Object.assign({}, r), { users: [...r.users, { userid, name, online: true }] });
        }
        return r;
    });
    state.rooms = state.rooms.filter((r) => r.users.length > 0);
    state.rooms = state.rooms.map((r) => {
        if (r.roomid === roomid && r.hostid == userid) {
            return Object.assign(Object.assign({}, r), { hostid: r.users[0].userid });
        }
        return r;
    });
    const roomsOfInterest = state.rooms.filter((r) => r.roomid === "homeroom");
    if (roomsOfInterest.length !== 1) {
        return new apollo_server_1.ApolloError("Unexpected Server Error from LeaveCurrentRoomMutation");
    }
    return roomsOfInterest[0];
};
//# sourceMappingURL=leaveCurrentRoomMutation.js.map