import { combineReducers } from "redux";
import game from "./game";
import session from "./session";

const rootReducer = combineReducers({
  game,
  session,
});

export default rootReducer;
