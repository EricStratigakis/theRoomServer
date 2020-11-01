import { ApolloError } from "apollo-server";
import {
  RoomT,
  joinExisitingRoomInputT,
  ServerStateT,
} from "../../serverTypes";

export default (
  state: ServerStateT,
  { userid, name, roomid }: joinExisitingRoomInputT
): RoomT | ApolloError => {
  if (userid === "homid") {
    return new ApolloError(
      "homid can never leave the homeroom, so cant join an existing room"
    );
  }
  if (state.rooms.filter((r) => r.roomid === roomid).length == 0) {
    return new ApolloError("trying to join room that does not exist");
  }
  state.rooms = state.rooms.map((r) => {
    if (r.roomid === "homeroom") {
      return {
        ...r,
        users: r.users.filter((u) => u.userid !== userid),
      };
    }
    if (r.roomid === roomid) {
      return {
        ...r,
        users: [...r.users, { userid, name, online: true }],
      };
    }
    return r;
  });

  const roomsOfInterest = state.rooms.filter((r) => r.roomid === roomid);
  if (roomsOfInterest.length !== 1) {
    return new ApolloError("Unexpected Server Error");
  }
  return roomsOfInterest[0];
};
