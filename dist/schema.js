"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
const roomsQuery_1 = __importDefault(require("./resolvers/roomsQuery"));
const store_1 = __importDefault(require("./redux/store"));
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
`;
exports.resolvers = {
    Query: {
        getRooms: (_, args) => {
            return roomsQuery_1.default(store_1.default).rooms;
        },
    },
};
//# sourceMappingURL=schema.js.map