import leaveCurrentRoomMutation from "./leaveCurrentRoomMutation";
import initialState, {
  blemHostAlone,
  blemHostWithBarney,
  belmInHomeNoOtherRooms,
  blemInHomeRoomWithBarneyHost,
} from "../../states";
import { ApolloError } from "apollo-server";

test("user cant leave the homeroom", () => {
  const res = leaveCurrentRoomMutation(initialState, {
    userid: "789",
    name: "wahtever",
    roomid: "homeroom",
  });
  expect(res).toStrictEqual(new ApolloError("nobody can leave the home room"));
});

test("blems leaves room 321 as host, and only player", () => {
  let state = blemHostAlone;
  const res = leaveCurrentRoomMutation(state, {
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
  expect(state).toStrictEqual(belmInHomeNoOtherRooms);
});

test("blems leaves room 321 as host, and leaves barney to be successor, and only player", () => {
  let state = blemHostWithBarney;
  const res = leaveCurrentRoomMutation(state, {
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
  expect(state).toStrictEqual(blemInHomeRoomWithBarneyHost);
});
