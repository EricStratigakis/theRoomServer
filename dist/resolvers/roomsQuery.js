"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = (store) => {
    let rooms = store.getState().root.rooms;
    if (rooms.length == 0) {
        return new apollo_server_1.ApolloError("Rooms are empty");
    }
    return store.getState().root;
};
//# sourceMappingURL=roomsQuery.js.map