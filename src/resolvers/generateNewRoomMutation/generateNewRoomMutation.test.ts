import generateNewRoomMutation from "./generateNewRoomMutation";
import initialState, { blemHostAlone, toddInHomeRoom } from "../../states";
import { ApolloError } from "apollo-server";

test("New user who is not already know, generates a room", () => {
  let state = initialState;
  const res = generateNewRoomMutation(state, {
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
  expect(state).toStrictEqual(blemHostAlone);
});
test("User that was already in homeroom, gnerates a new room, and a name change", () => {
  let state = toddInHomeRoom;
  const res = generateNewRoomMutation(state, {
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
  expect(state).toStrictEqual(blemHostAlone);
});
test("homie tries to generate a new room", () => {
  let state = toddInHomeRoom;
  const res = generateNewRoomMutation(state, {
    userid: "homid",
    name: "blem",
    roomid: "321",
  });
  expect(res).toStrictEqual(
    new ApolloError(
      "homid can never leave the homeroom, so cant generate a new room"
    )
  );
});
