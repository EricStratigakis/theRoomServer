import { ApolloError } from "apollo-server";
import { ServerStateT, RoomT } from "../../serverTypes";

export default (state: ServerStateT): RoomT[] | ApolloError => {
  if (state.rooms.length == 0) {
    return new ApolloError("Rooms are empty");
  }
  return state.rooms;
};
