import dal from "../dal";

const getPlayerInfo = (userId) => {
  const user = dal.getUser(userId);
  const basicRecord = dal.getWinsLossesRecord(userId);
  const playerInfo = {
    id: user.id,
    username: user.username,
    image: user.image,
    basicRecord,
  };
  return playerInfo;
};

const resolvers = {
  Query: {
    players: (root, { username }) => {
      const string = `.*${username}.*`;
      const regExp = new RegExp(string);
      return dal.filterUsersByUsername(regExp);
    },
    playerInfo: (root, { id }) => {
      return getPlayerInfo(id);
    },
    playerStat: (root, { id: userId, skip }) => {
      //const user = dal.getUser(userId);
      const record = dal.gePlayerRecord(userId);
      // const games = dal.getGamesOfUser(userId, 0, skip)
      //   .map(game => ({...game, opponent:dal.getUser(game.opponent).username}));
      const playerStat = { id: userId, record };

      return playerStat;
    },

    playerGames: (root, { id, offset, limit }) => {
      return dal
        .getGamesOfUser(id, offset, limit)
        .map((game) => ({
          ...game,
          opponent: dal.getUser(game.opponent).username,
        }));
    },
  },
};

export default resolvers;
