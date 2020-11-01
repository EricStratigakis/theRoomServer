import { ServerStateT } from "./serverTypes";

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
