import joinExisitingRoomMutation from "./joinExisitingRoomMutation";
import initialState, {
  blemHostAlone,
  blemHostWithBarney,
  toddInHomeRoom,
  bartInHomeRoomBlemHostAlone,
} from "../../states";
import { ApolloError } from "apollo-server";

test("New user who is not already know, joins an existing room", () => {
  let state = blemHostAlone;
  const res = joinExisitingRoomMutation(state, {
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
  expect(state).toStrictEqual(blemHostWithBarney);
});
test("User that was already in homeroom, joins an existing room, and a name change", () => {
  let state = bartInHomeRoomBlemHostAlone;
  const res = joinExisitingRoomMutation(state, {
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
  expect(state).toStrictEqual(blemHostWithBarney);
});
test("homie tries to join an existing room", () => {
  let state = toddInHomeRoom;
  const res = joinExisitingRoomMutation(state, {
    userid: "homid",
    name: "blem",
    roomid: "321",
  });
  expect(res).toStrictEqual(
    new ApolloError(
      "homid can never leave the homeroom, so cant join an existing room"
    )
  );
});
