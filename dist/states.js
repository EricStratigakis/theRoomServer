"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playGroundTestState = exports.blemInHomeRoomWithBarneyHost = exports.belmInHomeNoOtherRooms = exports.bartInHomeRoomBlemHostAlone = exports.blemHostWithBarney = exports.blemHostAlone = exports.toddInHomeRoom = exports.blankState = void 0;
exports.blankState = {
    rooms: [],
};
exports.toddInHomeRoom = {
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
                    userid: "todd_id",
                    online: false,
                },
            ],
        },
    ],
};
exports.blemHostAlone = {
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
        {
            roomid: "321",
            hostid: "todd_id",
            users: [
                {
                    name: "blem",
                    userid: "todd_id",
                    online: true,
                },
            ],
        },
    ],
};
exports.blemHostWithBarney = {
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
        {
            roomid: "321",
            hostid: "todd_id",
            users: [
                {
                    name: "blem",
                    userid: "todd_id",
                    online: true,
                },
                {
                    name: "barney",
                    userid: "bart_id",
                    online: true,
                },
            ],
        },
    ],
};
exports.bartInHomeRoomBlemHostAlone = {
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
                    name: "bart",
                    userid: "bart_id",
                    online: false,
                },
            ],
        },
        {
            roomid: "321",
            hostid: "todd_id",
            users: [
                {
                    name: "blem",
                    userid: "todd_id",
                    online: true,
                },
            ],
        },
    ],
};
exports.belmInHomeNoOtherRooms = {
    rooms: [
        {
            hostid: "homid",
            roomid: "homeroom",
            users: [
                { userid: "homid", name: "homie", online: true },
                { userid: "todd_id", name: "blem", online: true },
            ],
        },
    ],
};
exports.blemInHomeRoomWithBarneyHost = {
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
                    name: "blem",
                    userid: "todd_id",
                    online: true,
                },
            ],
        },
        {
            roomid: "321",
            hostid: "bart_id",
            users: [
                {
                    name: "barney",
                    userid: "bart_id",
                    online: true,
                },
            ],
        },
    ],
};
exports.playGroundTestState = {
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
        {
            roomid: "321",
            hostid: "todd_id",
            users: [
                {
                    name: "blem",
                    userid: "todd_id",
                    online: true,
                },
            ],
        },
    ],
};
const initalState = {
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
exports.default = initalState;
//# sourceMappingURL=states.js.map