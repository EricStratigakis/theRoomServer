"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = (state) => {
    if (state.rooms.length == 0) {
        return new apollo_server_1.ApolloError("Rooms are empty");
    }
    return state.rooms;
};
//# sourceMappingURL=getRoomsQuery.js.map