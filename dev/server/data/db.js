import moment from "moment";

const db = {
  models: {
    users: [
      {
        id: 1,
        username: "amitush",
        firstName: "Amit",
        lastName: "Shalev",
        password: "123",
        country: "us",
        image: "/images/pp.jpg",
      },
      {
        id: 2,
        username: "deanush",
        firstName: "Dean",
        lastName: "Shub",
        password: "234",
        country: "il",
      },
      {
        id: 3,
        username: "avivush",
        firstName: "Aviv",
        lastName: "Aviv",
        password: "345",
        country: "ch",
      },
    ],
    games: [
      { id: 1, host: 1, guest: 2, score: 1, date: moment() },
      {
        id: 2,
        host: 1,
        guest: 3,
        score: 2,
        date: moment().subtract("days", 2),
      },
      {
        id: 3,
        host: 2,
        guest: 3,
        score: 1,
        date: moment().subtract("days", 18),
      },
      {
        id: 4,
        host: 1,
        guest: 3,
        score: 1,
        date: moment().subtract("days", 6),
      },
      { id: 5, host: 2, guest: 1, score: -1, date: moment() },
      {
        id: 6,
        host: 1,
        guest: 3,
        score: -1,
        date: moment().subtract("days", 46),
      },
      {
        id: 7,
        host: 2,
        guest: 3,
        score: 1,
        date: moment().subtract("days", 11),
      },
      {
        id: 8,
        host: 3,
        guest: 2,
        score: -2,
        date: moment().subtract("days", 6),
      },
    ],
  },
};

export default db;
