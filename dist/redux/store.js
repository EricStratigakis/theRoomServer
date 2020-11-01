"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeGen = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const rootSlice_1 = require("./slices/rootSlice/rootSlice");
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const redux_logger_1 = __importDefault(require("redux-logger"));
exports.storeGen = (rootState = {
    rooms: [
        {
            roomid: "homeroom",
            users: [{ name: "homie", userid: "homid", online: true }],
            hostid: "homid",
        },
    ],
}) => toolkit_1.configureStore({
    reducer: {
        root: rootSlice_1.rootSliceGen(rootState).reducer,
    },
    middleware: [redux_thunk_1.default, redux_logger_1.default],
});
const store = exports.storeGen();
exports.default = store;
//# sourceMappingURL=store.js.map