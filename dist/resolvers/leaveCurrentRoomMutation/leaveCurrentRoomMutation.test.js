"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaveCurrentRoomMutation_1 = __importDefault(require("./leaveCurrentRoomMutation"));
const states_1 = __importStar(require("../../states"));
const apollo_server_1 = require("apollo-server");
test("user cant leave the homeroom", () => {
    const res = leaveCurrentRoomMutation_1.default(states_1.default, {
        userid: "789",
        name: "wahtever",
        roomid: "homeroom",
    });
    expect(res).toStrictEqual(new apollo_server_1.ApolloError("nobody can leave the home room"));
});
test("blems leaves room 321 as host, and only player", () => {
    let state = states_1.blemHostAlone;
    const res = leaveCurrentRoomMutation_1.default(state, {
        userid: "todd_id",
        name: "blem",
        roomid: "321",
    });
    expect(res).toStrictEqual({
        hostid: "homid",
        users: [
            {
                name: "homie",
                userid: "homid",
                online: true,
            },
            {
                userid: "todd_id",
                name: "blem",
                online: true,
            },
        ],
        roomid: "homeroom",
    });
    expect(state).toStrictEqual(states_1.belmInHomeNoOtherRooms);
});
test("blems leaves room 321 as host, and leaves barney to be successor, and only player", () => {
    let state = states_1.blemHostWithBarney;
    const res = leaveCurrentRoomMutation_1.default(state, {
        userid: "todd_id",
        name: "blem",
        roomid: "321",
    });
    expect(res).toStrictEqual({
        hostid: "homid",
        users: [
            {
                name: "homie",
                userid: "homid",
                online: true,
            },
            {
                userid: "todd_id",
                name: "blem",
                online: true,
            },
        ],
        roomid: "homeroom",
    });
    expect(state).toStrictEqual(states_1.blemInHomeRoomWithBarneyHost);
});
//# sourceMappingURL=leaveCurrentRoomMutation.test.js.map