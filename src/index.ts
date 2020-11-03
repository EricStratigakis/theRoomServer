import {
  ApolloError,
  ApolloServer,
  gql,
  PubSub,
  withFilter,
} from "apollo-server";

import {
  RoomT,
  generateNewRoomInputT,
  joinExisitingRoomInputT,
  leaveCurrentRoomInputT,
  ServerStateT,
} from "./serverTypes";

const pubsub = new PubSub();

const state: ServerStateT = {
  rooms: [
    {
      roomid: "homeroom",
      hostid: "homid",
      users: [
        {
          name: "homie",
          userid: "homid",
          online: true,
        },
      ],
    },
  ],
};

const server = new ApolloServer({
  typeDefs: gql`
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
  `,
  resolvers: {
    Query: {
      getRooms: (_: any, {}: any): RoomT[] | ApolloError => {
        if (state.rooms.length == 0) {
          return new ApolloError("Rooms are empty");
        }
        return state.rooms;
      },
    },
    Mutation: {
      generateNewRoom: (
        _: any,
        { roomid, userid, name }: generateNewRoomInputT
      ): RoomT | ApolloError => {
        if (userid === "homid") {
          return new ApolloError(
            "homid can never leave the homeroom, so cant generate a new room"
          );
        }
        const newRoom: RoomT = {
          roomid,
          hostid: userid,
          users: [
            {
              userid,
              name,
              online: true,
            },
          ],
        };
        state.rooms.push(newRoom);
        state.rooms = state.rooms.map((r) => {
          if (r.roomid === "homeroom") {
            return {
              ...r,
              users: r.users.filter((u) => u.userid !== userid),
            };
          }
          return r;
        });
        const roomsOfInterest = state.rooms.filter((r) => r.roomid === roomid);
        if (roomsOfInterest.length !== 1) {
          return new ApolloError(
            "Unexpected Server Error from generateNewRoom"
          );
        }
        const room = roomsOfInterest[0];
        pubsub.publish("ROOM", { room });
        return room;
      },
      joinExisitingRoom: (
        _: any,
        { roomid, userid, name }: joinExisitingRoomInputT
      ): RoomT | ApolloError => {
        if (userid === "homid") {
          return new ApolloError(
            "homid can never leave the homeroom, so cant join an existing room"
          );
        }
        if (state.rooms.filter((r) => r.roomid === roomid).length == 0) {
          return new ApolloError("trying to join room that does not exist");
        }
        state.rooms = state.rooms.map((r) => {
          if (r.roomid === "homeroom") {
            return {
              ...r,
              users: r.users.filter((u) => u.userid !== userid),
            };
          }
          if (r.roomid === roomid) {
            return {
              ...r,
              users: [...r.users, { userid, name, online: true }],
            };
          }
          return r;
        });

        const roomsOfInterest = state.rooms.filter((r) => r.roomid === roomid);
        if (roomsOfInterest.length !== 1) {
          return new ApolloError(
            "Unexpected Server Error from joinExisitingRoom"
          );
        }
        const room = roomsOfInterest[0];
        pubsub.publish("ROOM", { room });
        return room;
      },
      leaveCurrentRoom: (
        _: any,
        { roomid, userid, name }: leaveCurrentRoomInputT
      ): RoomT | ApolloError => {
        if (roomid == "homeroom") {
          return new ApolloError("nobody can leave the home room");
        }
        if (userid === "homid") {
          return new ApolloError(
            "homid can never leave the homeroom, so cant join an existing room"
          );
        }
        if (state.rooms.filter((r) => r.roomid === roomid).length == 0) {
          return new ApolloError("trying to join room that does not exist");
        }
        state.rooms = state.rooms.map((r) => {
          if (r.roomid === roomid) {
            return {
              ...r,
              users: r.users.filter((u) => u.userid !== userid),
            };
          }
          if (r.roomid === "homeroom") {
            return {
              ...r,
              users: [...r.users, { userid, name, online: true }],
            };
          }
          return r;
        });
        state.rooms = state.rooms.filter((r) => r.users.length > 0);
        state.rooms = state.rooms.map((r) => {
          if (r.roomid === roomid && r.hostid == userid) {
            return {
              ...r,
              hostid: r.users[0].userid,
            };
          }
          return r;
        });
        const roomsOfInterest = state.rooms.filter(
          (r) => r.roomid === "homeroom"
        );
        if (roomsOfInterest.length !== 1) {
          return new ApolloError(
            "Unexpected Server Error from LeaveCurrentRoomMutation (homeroom DNE)"
          );
        }
        const homeroom = roomsOfInterest[0];
        pubsub.publish("ROOM", { room: homeroom });
        const oldRoomsOfInterest = state.rooms.filter(
          (r) => r.roomid === roomid
        );
        if (oldRoomsOfInterest.length === 1) {
          pubsub.publish("ROOM", { room: oldRoomsOfInterest[0] });
        }
        const oldRoom = oldRoomsOfInterest[0];
        pubsub.publish("ROOM", { room: oldRoom });
        return homeroom;
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
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});
