import { ApolloError } from "apollo-server";
import { RoomT, leaveCurrentRoomInputT, ServerStateT } from "../../serverTypes";

export default (
  state: ServerStateT,
  { userid, name, roomid }: leaveCurrentRoomInputT
): RoomT | ApolloError => {
  if (roomid == "homeroom") {
    return new ApolloError("nobody can leave the home room");
  }
  if (userid === "homid") {
    return new ApolloError(
      "homid can never leave the homeroom, so cant join an existing room"
    );
  }
  if (state.rooms.filter((r) => r.roomid === roomid).length == 0) {
    return new ApolloError("trying to join room that does not exist");
  }
  state.rooms = state.rooms.map((r) => {
    if (r.roomid === roomid) {
      return {
        ...r,
        users: r.users.filter((u) => u.userid !== userid),
      };
    }
    if (r.roomid === "homeroom") {
      return {
        ...r,
        users: [...r.users, { userid, name, online: true }],
      };
    }
    return r;
  });
  state.rooms = state.rooms.filter((r) => r.users.length > 0);
  state.rooms = state.rooms.map((r) => {
    if (r.roomid === roomid && r.hostid == userid) {
      return {
        ...r,
        hostid: r.users[0].userid,
      };
    }
    return r;
  });
  const roomsOfInterest = state.rooms.filter((r) => r.roomid === "homeroom");
  if (roomsOfInterest.length !== 1) {
    return new ApolloError(
      "Unexpected Server Error from LeaveCurrentRoomMutation"
    );
  }
  return roomsOfInterest[0];
};
