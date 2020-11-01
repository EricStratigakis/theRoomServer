import getRoomsQuery from "./getRoomsQuery";
import { ServerStateT } from "../../serverTypes";
import { blankState, toddInHomeRoom } from "../../states";
import { ApolloError } from "apollo-server";

test("rooms query returns no rooms exist apollo error if no rooms", () => {
  expect(getRoomsQuery(blankState)).toStrictEqual(
    new ApolloError("Rooms are empty")
  );
});
test("only home room", () => {
  expect(getRoomsQuery(toddInHomeRoom)).toStrictEqual([
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
  const state: ServerStateT = {
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
  expect(getRoomsQuery(state)).toStrictEqual([
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
