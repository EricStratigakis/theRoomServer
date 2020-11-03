import { ServerStateT } from "./serverTypes";
import { PubSub } from "apollo-server";

export const blankState: ServerStateT = {
  rooms: [],
};
export const toddInHomeRoom: ServerStateT = {
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
          userid: "todd_id",
          online: false,
        },
      ],
    },
  ],
};
export const blemHostAlone: ServerStateT = {
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
      ],
    },
    {
      roomid: "321",
      hostid: "todd_id",
      users: [
        {
          name: "blem",
          userid: "todd_id",
          online: true,
        },
      ],
    },
  ],
};
export const blemHostWithBarney: ServerStateT = {
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
      ],
    },
    {
      roomid: "321",
      hostid: "todd_id",
      users: [
        {
          name: "blem",
          userid: "todd_id",
          online: true,
        },
        {
          name: "barney",
          userid: "bart_id",
          online: true,
        },
      ],
    },
  ],
};
export const bartInHomeRoomBlemHostAlone: ServerStateT = {
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
          name: "bart",
          userid: "bart_id",
          online: false,
        },
      ],
    },
    {
      roomid: "321",
      hostid: "todd_id",
      users: [
        {
          name: "blem",
          userid: "todd_id",
          online: true,
        },
      ],
    },
  ],
};
export const belmInHomeNoOtherRooms: ServerStateT = {
  rooms: [
    {
      hostid: "homid",
      roomid: "homeroom",
      users: [
        { userid: "homid", name: "homie", online: true },
        { userid: "todd_id", name: "blem", online: true },
      ],
    },
  ],
};
export const blemInHomeRoomWithBarneyHost: ServerStateT = {
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
          name: "blem",
          userid: "todd_id",
          online: true,
        },
      ],
    },
    {
      roomid: "321",
      hostid: "bart_id",
      users: [
        {
          name: "barney",
          userid: "bart_id",
          online: true,
        },
      ],
    },
  ],
};
export const playGroundTestState: ServerStateT = {
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
      ],
    },
    {
      roomid: "321",
      hostid: "todd_id",
      users: [
        {
          name: "blem",
          userid: "todd_id",
          online: true,
        },
      ],
    },
  ],
};
const initalState: ServerStateT = {
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
      ],
    },
  ],
};

export default initalState;
