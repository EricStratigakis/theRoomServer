"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const pubsub = new apollo_server_1.PubSub();
const state = {
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
const server = new apollo_server_1.ApolloServer({
    typeDefs: apollo_server_1.gql `
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
            getRooms: (_, {}) => {
                if (state.rooms.length == 0) {
                    return new apollo_server_1.ApolloError("Rooms are empty");
                }
                return state.rooms;
            },
        },
        Mutation: {
            generateNewRoom: (_, { roomid, userid, name }) => {
                if (userid === "homid") {
                    return new apollo_server_1.ApolloError("homid can never leave the homeroom, so cant generate a new room");
                }
                const newRoom = {
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
                        return Object.assign(Object.assign({}, r), { users: r.users.filter((u) => u.userid !== userid) });
                    }
                    return r;
                });
                const roomsOfInterest = state.rooms.filter((r) => r.roomid === roomid);
                if (roomsOfInterest.length !== 1) {
                    return new apollo_server_1.ApolloError("Unexpected Server Error from generateNewRoom");
                }
                const room = roomsOfInterest[0];
                pubsub.publish("ROOM", { room });
                return room;
            },
            joinExisitingRoom: (_, { roomid, userid, name }) => {
                if (userid === "homid") {
                    return new apollo_server_1.ApolloError("homid can never leave the homeroom, so cant join an existing room");
                }
                if (state.rooms.filter((r) => r.roomid === roomid).length == 0) {
                    return new apollo_server_1.ApolloError("trying to join room that does not exist");
                }
                state.rooms = state.rooms.map((r) => {
                    if (r.roomid === "homeroom") {
                        return Object.assign(Object.assign({}, r), { users: r.users.filter((u) => u.userid !== userid) });
                    }
                    if (r.roomid === roomid) {
                        return Object.assign(Object.assign({}, r), { users: [...r.users, { userid, name, online: true }] });
                    }
                    return r;
                });
                const roomsOfInterest = state.rooms.filter((r) => r.roomid === roomid);
                if (roomsOfInterest.length !== 1) {
                    return new apollo_server_1.ApolloError("Unexpected Server Error from joinExisitingRoom");
                }
                const room = roomsOfInterest[0];
                pubsub.publish("ROOM", { room });
                return room;
            },
            leaveCurrentRoom: (_, { roomid, userid, name }) => {
                if (roomid == "homeroom") {
                    return new apollo_server_1.ApolloError("nobody can leave the home room");
                }
                if (userid === "homid") {
                    return new apollo_server_1.ApolloError("homid can never leave the homeroom, so cant join an existing room");
                }
                if (state.rooms.filter((r) => r.roomid === roomid).length == 0) {
                    return new apollo_server_1.ApolloError("trying to join room that does not exist");
                }
                state.rooms = state.rooms.map((r) => {
                    if (r.roomid === roomid) {
                        return Object.assign(Object.assign({}, r), { users: r.users.filter((u) => u.userid !== userid) });
                    }
                    if (r.roomid === "homeroom") {
                        return Object.assign(Object.assign({}, r), { users: [...r.users, { userid, name, online: true }] });
                    }
                    return r;
                });
                state.rooms = state.rooms.filter((r) => r.users.length > 0);
                state.rooms = state.rooms.map((r) => {
                    if (r.roomid === roomid && r.hostid == userid) {
                        return Object.assign(Object.assign({}, r), { hostid: r.users[0].userid });
                    }
                    return r;
                });
                const roomsOfInterest = state.rooms.filter((r) => r.roomid === "homeroom");
                if (roomsOfInterest.length !== 1) {
                    return new apollo_server_1.ApolloError("Unexpected Server Error from LeaveCurrentRoomMutation (homeroom DNE)");
                }
                const homeroom = roomsOfInterest[0];
                pubsub.publish("ROOM", { room: homeroom });
                const oldRoomsOfInterest = state.rooms.filter((r) => r.roomid === roomid);
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
                subscribe: apollo_server_1.withFilter(() => pubsub.asyncIterator(["ROOM"]), (payload, args) => {
                    return payload.room.roomid === args.roomid;
                }),
            },
        },
    },
});
server.listen().then(({ url }) => {
    console.log(`Server is ready at ${url}`);
});
//# sourceMappingURL=index.js.map