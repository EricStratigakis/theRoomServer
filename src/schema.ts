import { ApolloError, gql } from "apollo-server";
import getRoomsQuery from "./resolvers/getRoomsQuery/getRoomsQuery";
import generateNewRoomMutation from "./resolvers/generateNewRoomMutation/generateNewRoomMutation";

import { RoomT, generateNewRoomInputT } from "./serverTypes";
import intialState, { playGroundTestState } from "./states";

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
  type Mutation {
    generateNewRoom(userid: ID!, name: String!, roomid: ID!): Room
  }
`;

export const resolvers = {
  Query: {
    getRooms: (_: any, args: any): RoomT[] | ApolloError => {
      return getRoomsQuery(intialState);
    },
  },
  Mutation: {
    generateNewRoom: (
      _: any,
      args: generateNewRoomInputT
    ): RoomT | ApolloError => {
      return generateNewRoomMutation(intialState, args);
    },
  },
};
