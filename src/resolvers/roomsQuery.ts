import { ApolloError } from "apollo-server";
import { StoreT } from "../redux/store";
import { ServerStateT } from "../serverTypes";

export default (store: StoreT): ServerStateT | ApolloError => {
  let rooms = store.getState().root.rooms;
  if (rooms.length == 0) {
    return new ApolloError("Rooms are empty");
  }
  return store.getState().root;
};
