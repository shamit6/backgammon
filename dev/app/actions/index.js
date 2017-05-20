export const SWITCH_TURN = "SWITCH_TURN";
export const STEP = "STEP";
export const DICING = "DICING";
export const SET_TURN = "SET_TURN";
export const INIT_STATE = "INIT_STATE";

export const switchTurn = () => ({type:SWITCH_TURN})
export const initState = () => ({type:INIT_STATE, content: null})
export const step = step => ({type:STEP, content: step})
export const dice = dicesResult => ({type:DICING, content: dicesResult})
export const setTurn = isClientTurn => ({type:SET_TURN, content:isClientTurn})
