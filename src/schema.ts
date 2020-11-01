import { ApolloError, gql } from "apollo-server";
import roomsQuery from "./resolvers/roomsQuery";
import { RoomT } from "./serverTypes";
import store from "./redux/store";

export const typeDefs = gql`
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

export const resolvers = {
  Query: {
    getRooms: (_: any, args: any): RoomT[] | ApolloError => {
      return roomsQuery(store).rooms;
    },
  },
};
