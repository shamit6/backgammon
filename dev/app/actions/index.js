export const SWITCH_TURN = "SWITCH_TURN";
export const STEP = "STEP";
export const DICING = "DICING";
//export const SET_TURN = "SET_TURN";
//export const INIT_STATE = "INIT_STATE";

export const switchTurn = () => ({type:SWITCH_TURN});
//export const initState = () => ({type:INIT_STATE});
export const step = step => ({type:STEP, content: step});
export const dice = dicesResult => ({type:DICING, content: dicesResult});
//export const setTurn = isClientTurn => ({type:SET_TURN, content:isClientTurn});

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SEARCH_OPPONENT = "SEARCH_OPPONENT";
export const SRART_GAME = "SRART_GAME";
export const OPPONENT_RETIRED = "OPPONENT_RETIRED";

export const login = user => ({type:LOG_IN, content: user});
export const logout = () => ({type:LOG_OUT});
export const searchOpponent = () => ({type:SEARCH_OPPONENT});
export const startGame = (isClientStart, opponentInfo) => ({type:SRART_GAME, content:{isClientStart, opponentInfo}});
export const opponentRetirment = () => ({type:OPPONENT_RETIRED});
