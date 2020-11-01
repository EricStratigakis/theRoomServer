"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
const getRoomsQuery_1 = __importDefault(require("./resolvers/getRoomsQuery/getRoomsQuery"));
const generateNewRoomMutation_1 = __importDefault(require("./resolvers/generateNewRoomMutation/generateNewRoomMutation"));
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
  }
`;
exports.resolvers = {
    Query: {
        getRooms: (_, args) => {
            return getRoomsQuery_1.default(states_1.default);
        },
    },
    Mutation: {
        generateNewRoom: (_, args) => {
            return generateNewRoomMutation_1.default(states_1.default, args);
        },
    },
};
//# sourceMappingURL=schema.js.map