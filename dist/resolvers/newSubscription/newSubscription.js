"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newSubscriptionResolver = exports.newSubscriptionSubscribe = void 0;
const apollo_server_1 = require("apollo-server");
const index_1 = require("../../index");
exports.newSubscriptionSubscribe = () => {
    apollo_server_1.withFilter(() => index_1.pubsub.asyncIterator(["NEW_SUBSCRIBER"]), ({ updatedRoom }, { userid }) => {
        console.log({ updatedRoom, userid });
        // the function that determines which clients we send updates too
        return updatedRoom.users.filter((u) => u.userid == userid).length > 0;
    });
};
exports.newSubscriptionResolver = ({ updatedRoom }) => {
    return updatedRoom;
};
//# sourceMappingURL=newSubscription.js.map