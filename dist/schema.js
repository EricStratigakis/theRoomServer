"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
const getRoomsQuery_1 = __importDefault(require("./resolvers/getRoomsQuery/getRoomsQuery"));
const generateNewRoomMutation_1 = __importDefault(require("./resolvers/generateNewRoomMutation/generateNewRoomMutation"));
const joinExisitingRoomMutation_1 = __importDefault(require("./resolvers/joinExisitingRoomMutation/joinExisitingRoomMutation"));
const leaveCurrentRoomMutation_1 = __importDefault(require("./resolvers/leaveCurrentRoomMutation/leaveCurrentRoomMutation"));
const states_1 = __importDefault(require("./states"));
exports.typeDefs = apollo_server_1.gql `
  type User {
    userid: ID!
    name: String!
    online: Boolean!
  }
  type Room {
    roomid: ID!
    users: [User!]
    hostid: ID!
  }
  type ServerState {
    rooms: [Room!]
  }
  type Query {
    getRooms: [Room!]
  }
  type Mutation {
    generateNewRoom(userid: ID!, name: String!, roomid: ID!): Room
    joinExisitingRoom(userid: ID!, name: String!, roomid: ID!): Room
    leaveCurrentRoom(userid: ID!, name: String!, roomid: ID!): Room
  }
  type Subscription {
    room(roomid: ID!): Room
  }
`;
const pubsub = new apollo_server_1.PubSub();
exports.resolvers = {
    Query: {
        getRooms: (_, args) => {
            return getRoomsQuery_1.default(states_1.default);
        },
    },
    Mutation: {
        generateNewRoom: (_, args) => {
            let room = generateNewRoomMutation_1.default(states_1.default, args);
            pubsub.publish("ROOM", { room });
            return room;
        },
        joinExisitingRoom: (_, args) => {
            let room = joinExisitingRoomMutation_1.default(states_1.default, args);
            pubsub.publish("ROOM", { room });
            return room;
        },
        leaveCurrentRoom: (_, args) => {
            let room = leaveCurrentRoomMutation_1.default(states_1.default, args);
            pubsub.publish("ROOM", { room });
            return room;
        },
    },
    Subscription: {
        room: {
            subscribe: apollo_server_1.withFilter(() => pubsub.asyncIterator(["ROOM"]), (payload, args) => {
                return payload.room.roomid === args.roomid;
            }),
        },
    },
};
//# sourceMappingURL=schema.js.map