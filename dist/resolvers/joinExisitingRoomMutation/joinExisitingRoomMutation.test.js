"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joinExisitingRoomMutation_1 = __importDefault(require("./joinExisitingRoomMutation"));
const states_1 = require("../../states");
const apollo_server_1 = require("apollo-server");
test("New user who is not already know, joins an existing room", () => {
    let state = states_1.blemHostAlone;
    const res = joinExisitingRoomMutation_1.default(state, {
        userid: "bart_id",
        name: "barney",
        roomid: "321",
    });
    expect(res).toStrictEqual({
        hostid: "todd_id",
        users: [
            {
                userid: "todd_id",
                name: "blem",
                online: true,
            },
            {
                userid: "bart_id",
                name: "barney",
                online: true,
            },
        ],
        roomid: "321",
    });
    expect(state).toStrictEqual(states_1.blemHostWithBarney);
});
test("User that was already in homeroom, joins an existing room, and a name change", () => {
    let state = states_1.bartInHomeRoomBlemHostAlone;
    const res = joinExisitingRoomMutation_1.default(state, {
        userid: "bart_id",
        name: "barney",
        roomid: "321",
    });
    expect(res).toStrictEqual({
        hostid: "todd_id",
        users: [
            {
                userid: "todd_id",
                name: "blem",
                online: true,
            },
            {
                name: "barney",
                userid: "bart_id",
                online: true,
            },
        ],
        roomid: "321",
    });
    expect(state).toStrictEqual(states_1.blemHostWithBarney);
});
test("homie tries to join an existing room", () => {
    let state = states_1.toddInHomeRoom;
    const res = joinExisitingRoomMutation_1.default(state, {
        userid: "homid",
        name: "blem",
        roomid: "321",
    });
    expect(res).toStrictEqual(new apollo_server_1.ApolloError("homid can never leave the homeroom, so cant join an existing room"));
});
//# sourceMappingURL=joinExisitingRoomMutation.test.js.map