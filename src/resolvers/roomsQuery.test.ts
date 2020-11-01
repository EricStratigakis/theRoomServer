import roomsQuery from "./roomsQuery";
import { ServerStateT } from "../serverTypes";
import { storeGen } from "../redux/store";
import { ApolloError } from "apollo-server";

test("rooms query returns no rooms exist apollo error if no rooms", () => {
  //initialize store with state.rooms = []
  let store = storeGen({ rooms: [] });
  expect(roomsQuery(store)).toStrictEqual(new ApolloError("Rooms are empty"));
});

test("only home room", () => {
  //initialize store with
  let state: ServerStateT = {
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
  let store = storeGen(state);

  expect(roomsQuery(store)).toStrictEqual({
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
  let state: ServerStateT = {
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
  let store = storeGen(state);

  expect(roomsQuery(store)).toStrictEqual({
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
