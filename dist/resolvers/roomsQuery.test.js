"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roomsQuery_1 = __importDefault(require("./roomsQuery"));
const store_1 = require("../redux/store");
const apollo_server_1 = require("apollo-server");
test("rooms query returns no rooms exist apollo error if no rooms", () => {
    //initialize store with state.rooms = []
    let store = store_1.storeGen({ rooms: [] });
    expect(roomsQuery_1.default(store)).toStrictEqual(new apollo_server_1.ApolloError("Rooms are empty"));
});
test("only home room", () => {
    //initialize store with
    let state = {
        rooms: [
            {
                roomid: "homeroom",
                hostid: "1",
                users: [
                    {
                        name: "homie",
                        userid: "homid",
                        online: true,
                    },
                    {
                        name: "todd",
                        userid: "2",
                        online: false,
                    },
                ],
            },
        ],
    };
    let store = store_1.storeGen(state);
    expect(roomsQuery_1.default(store)).toStrictEqual({
        rooms: [
            {
                roomid: "homeroom",
                hostid: "1",
                users: [
                    {
                        name: "homie",
                        userid: "homid",
                        online: true,
                    },
                    {
                        name: "todd",
                        userid: "2",
                        online: false,
                    },
                ],
            },
        ],
    });
});
test("homeroom and 1 more room", () => {
    //initialize store with
    let state = {
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
                    {
                        name: "todd",
                        userid: "2",
                        online: false,
                    },
                ],
            },
            {
                roomid: "room1",
                hostid: "1",
                users: [
                    {
                        name: "eric",
                        userid: "1",
                        online: true,
                    },
                    {
                        name: "sonja",
                        userid: "3",
                        online: false,
                    },
                ],
            },
        ],
    };
    let store = store_1.storeGen(state);
    expect(roomsQuery_1.default(store)).toStrictEqual({
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
                    {
                        name: "todd",
                        userid: "2",
                        online: false,
                    },
                ],
            },
            {
                roomid: "room1",
                hostid: "1",
                users: [
                    {
                        name: "eric",
                        userid: "1",
                        online: true,
                    },
                    {
                        name: "sonja",
                        userid: "3",
                        online: false,
                    },
                ],
            },
        ],
    });
});
//# sourceMappingURL=roomsQuery.test.js.map