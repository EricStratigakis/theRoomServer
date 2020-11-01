"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rootSlice_1 = __importDefault(require("./rootSlice"));
test("rootSlice defenitions", () => {
    expect(rootSlice_1.default.name).toBe("rootSlice");
    expect(rootSlice_1.default.actions).toBeDefined();
    expect(rootSlice_1.default.reducer).toBeDefined();
    expect(rootSlice_1.default.caseReducers).toBeDefined();
});
//   test("rootSlice.actions.updateUserName defenition", () => {
//     expect(rootSlice.actions.updateUserName).toBeDefined();
//     expect(rootSlice.actions.updateUserName.type).toStrictEqual(
//       "rootSlice/updateUserName"
//     );
//   });
//   test("updateUserNameState QA", () => {
//     const beforeState = {
//       rooms: {
//         home: {
//           hostid: "user1",
//           users: { user1: { name: "eric", active: true } },
//         },
//       },
//     };
//     const afterState = {
//       rooms: {
//         home: {
//           hostid: "user1",
//           users: { user1: { name: "todd", active: true } },
//         },
//       },
//     };
//     expect(
//       updateUserNameState(beforeState, "home", "user1", "todd")
//     ).toStrictEqual(afterState);
//   });
//   test("userJoinsRoomState room exists QA", () => {
//     const beforeState = {
//       rooms: {
//         home: {
//           hostid: "homie",
//           users: {
//             homie: { name: "homie", active: true },
//             user1: { name: "sonja", active: true },
//           },
//         },
//         room1: {
//           hostid: "user2",
//           users: {
//             user2: { name: "eric", active: true },
//           },
//         },
//       },
//     };
//     const afterState = {
//       rooms: {
//         home: {
//           hostid: "homie",
//           users: {
//             homie: { name: "homie", active: true },
//           },
//         },
//         room1: {
//           hostid: "user2",
//           users: {
//             user2: { name: "eric", active: true },
//             user1: { name: "sonja", active: true },
//           },
//         },
//       },
//     };
//     expect(
//       userJoinsRoomState(beforeState, "user1", "home", "room1")
//     ).toStrictEqual(afterState);
//   });
//   test("userJoinsRoomState new room QA", () => {
//     const beforeState = {
//       rooms: {
//         home: {
//           hostid: "homie",
//           users: {
//             homie: { name: "homie", active: true },
//             user1: { name: "eric", active: true },
//           },
//         },
//       },
//     };
//     const afterState = {
//       rooms: {
//         home: {
//           hostid: "homie",
//           users: {
//             homie: { name: "homie", active: true },
//           },
//         },
//         room1: {
//           hostid: "user1",
//           users: {
//             user1: { name: "eric", active: true },
//           },
//         },
//       },
//     };
//     expect(
//       userJoinsRoomState(beforeState, "user1", "home", "room1")
//     ).toStrictEqual(afterState);
//   });
//   test("userJoinsRoomState user DNE QA", () => {
//     const beforeState = {
//       rooms: {
//         home: {
//           hostid: "homie",
//           users: {
//             homie: { name: "homie", active: true },
//           },
//         },
//       },
//     };
//     const afterState = {
//       rooms: {
//         home: {
//           hostid: "homie",
//           users: {
//             homie: { name: "homie", active: true },
//           },
//         },
//         room1: {
//           hostid: "user1",
//           users: {
//             user1: { name: "", active: true },
//           },
//         },
//       },
//     };
//     expect(
//       userJoinsRoomState(beforeState, "user1", "home", "room1")
//     ).toStrictEqual(afterState);
//   });
//# sourceMappingURL=rootSlice.test.js.map