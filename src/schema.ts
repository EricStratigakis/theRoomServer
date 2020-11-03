import { ApolloError, gql, PubSub, withFilter } from "apollo-server";
import getRoomsQuery from "./resolvers/getRoomsQuery/getRoomsQuery";
import generateNewRoomMutation from "./resolvers/generateNewRoomMutation/generateNewRoomMutation";
import joinExisitingRoomMutation from "./resolvers/joinExisitingRoomMutation/joinExisitingRoomMutation";
import leaveCurrentRoomMutation from "./resolvers/leaveCurrentRoomMutation/leaveCurrentRoomMutation";
import {
  RoomT,
  generateNewRoomInputT,
  joinExisitingRoomInputT,
  leaveCurrentRoomInputT,
} from "./serverTypes";
import intialState, { playGroundTestState } from "./states";
import { pubsub } from "./index";

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
    joinExisitingRoom(userid: ID!, name: String!, roomid: ID!): Room
    leaveCurrentRoom(userid: ID!, name: String!, roomid: ID!): Room
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
    joinExisitingRoom: (
      _: any,
      args: joinExisitingRoomInputT
    ): RoomT | ApolloError => {
      return joinExisitingRoomMutation(intialState, args);
    },
    leaveCurrentRoom: (
      _: any,
      args: leaveCurrentRoomInputT
    ): RoomT | ApolloError => {
      return leaveCurrentRoomMutation(intialState, args);
    },
  },
};
