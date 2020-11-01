import { ApolloError } from "apollo-server";
import { RoomT, generateNewRoomInputT, ServerStateT } from "../../serverTypes";

export default (
  state: ServerStateT,
  { userid, name, roomid }: generateNewRoomInputT
): RoomT | ApolloError => {
  if (userid === "homid") {
    return new ApolloError(
      "homid can never leave the homeroom, so cant generate a new room"
    );
  }
  const newRoom: RoomT = {
    roomid,
    hostid: userid,
    users: [
      {
        userid,
        name,
        online: true,
      },
    ],
  };
  state.rooms.push(newRoom);
  state.rooms = state.rooms.map((r) => {
    if (r.roomid === "homeroom") {
      return {
        ...r,
        users: r.users.filter((u) => u.userid !== userid),
      };
    }
    return r;
  });
  const roomsOfInterest = state.rooms.filter((r) => r.roomid === roomid);
  if (roomsOfInterest.length > 1) {
    return new ApolloError("can only generate new room from home room");
  }
  if (roomsOfInterest.length === 0) {
    return new ApolloError("problem with the room generation");
  }
  return roomsOfInterest[0];
};
