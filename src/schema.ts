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
  type Subscription {
    room(roomid: ID!): Room
  }
`;
const pubsub = new PubSub();
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
      let room = generateNewRoomMutation(intialState, args);
      pubsub.publish("ROOM", { room });
      return room;
    },
    joinExisitingRoom: (
      _: any,
      args: joinExisitingRoomInputT
    ): RoomT | ApolloError => {
      let room = joinExisitingRoomMutation(intialState, args);
      pubsub.publish("ROOM", { room });
      return room;
    },
    leaveCurrentRoom: (
      _: any,
      args: leaveCurrentRoomInputT
    ): RoomT | ApolloError => {
      let room = leaveCurrentRoomMutation(intialState, args);
      pubsub.publish("ROOM", { room });
      return room;
    },
  },
  Subscription: {
    room: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(["ROOM"]),
        (payload, args) => {
          return payload.room.roomid === args.roomid;
        }
      ),
    },
  },
};
