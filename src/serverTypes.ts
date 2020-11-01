export type UserT = {
  userid: string;
  name: string;
  online: boolean;
};
export type RoomT = {
  roomid: string;
  users: UserT[];
  hostid: string;
};
export type ServerStateT = {
  rooms: RoomT[];
};
export type ClinetStateT = {
  name: string;
  useried: string;
  active: boolean;
  roomid: string;
  rooms: RoomT[];
};
export type generateNewRoomInputT = {
  userid: string;
  name: string;
  roomid: string;
};
