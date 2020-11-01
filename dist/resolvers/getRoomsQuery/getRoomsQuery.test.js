"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getRoomsQuery_1 = __importDefault(require("./getRoomsQuery"));
const states_1 = require("../../states");
const apollo_server_1 = require("apollo-server");
test("rooms query returns no rooms exist apollo error if no rooms", () => {
    expect(getRoomsQuery_1.default(states_1.blankState)).toStrictEqual(new apollo_server_1.ApolloError("Rooms are empty"));
});
test("only home room", () => {
    expect(getRoomsQuery_1.default(states_1.toddInHomeRoom)).toStrictEqual([
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
                    userid: "todd_id",
                    online: false,
                },
            ],
        },
    ]);
});
test("homeroom and 1 more room", () => {
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
    expect(getRoomsQuery_1.default(state)).toStrictEqual([
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
    ]);
});
//# sourceMappingURL=getRoomsQuery.test.js.map