"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playGroundTestState = exports.blemHostAlone = exports.toddInHomeRoom = exports.blankState = void 0;
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