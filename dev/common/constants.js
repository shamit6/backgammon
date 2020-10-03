// const IO_ACTIONS = {startGame: "START_GAME", gameAction:"GAME_ACTION", opponentRetirement:"OPPONENT_RETIREMENT",
// searchNewOpponent:"SEARCH_NEW_OPPONENT", rematch:"REMATCH"};

const IO_ACTIONS = {
  SEARCH_NEW_OPPONENT: 0,
  START_GAME: 1,
  GAME_ACTION: 2,
  OPPONENT_RETIREMENT: 3,
  GAME_OVER: 4,
  CHAT_MESSAGE: 5,
};
const COUNTRIES = [
  { key: "af", value: "af", flag: "af", text: "Afghanistan" },
  { key: "be", value: "be", flag: "be", text: "Belgium" },
  { key: "br", value: "br", flag: "br", text: "Brazil" },
  { key: "cl", value: "cl", flag: "cl", text: "Chile" },
  { key: "fr", value: "fr", flag: "fr", text: "France" },
  { key: "de", value: "de", flag: "de", text: "Germany" },
  { key: "il", value: "il", flag: "il", text: "Israel" },
  { key: "it", value: "it", flag: "it", text: "Italy" },
  { key: "lt", value: "lt", flag: "lt", text: "Lithuania" },
  { key: "nl", value: "nl", flag: "nl", text: "Netherlands" },
  { key: "ru", value: "ru", flag: "ru", text: "Russia" },
  { key: "gb", value: "gb", flag: "gb", text: "United Kingdom" },
  { key: "us", value: "us", flag: "us", text: "United States" },
];
export { IO_ACTIONS };
export { COUNTRIES };
