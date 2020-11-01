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
const generateNewRoomMutation_1 = __importDefault(require("./generateNewRoomMutation"));
const states_1 = __importStar(require("../../states"));
const apollo_server_1 = require("apollo-server");
test("New user who is not already know, generates a room", () => {
    let state = states_1.default;
    const res = generateNewRoomMutation_1.default(state, {
        userid: "todd_id",
        name: "blem",
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
        ],
        roomid: "321",
    });
    expect(state).toStrictEqual(states_1.blemHostAlone);
});
test("User that was already in homeroom, gnerates a new room, and a name change", () => {
    let state = states_1.toddInHomeRoom;
    const res = generateNewRoomMutation_1.default(state, {
        userid: "todd_id",
        name: "blem",
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
        ],
        roomid: "321",
    });
    expect(state).toStrictEqual(states_1.blemHostAlone);
});
test("homie tries to generate a new room", () => {
    let state = states_1.toddInHomeRoom;
    const res = generateNewRoomMutation_1.default(state, {
        userid: "homid",
        name: "blem",
        roomid: "321",
    });
    expect(res).toStrictEqual(new apollo_server_1.ApolloError("homid can never leave the homeroom, so cant generate a new room"));
});
//# sourceMappingURL=generateNewRoomMutation.test.js.map