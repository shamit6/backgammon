export const SWITCH_TURN = "SWITCH_TURN";
export const MOVING = "MOVING";
export const DICING = "DICING";

export const switchTurn = () => ({type:SWITCH_TURN})
export const makeMove = move => ({type:MOVING, move})
export const dice = dicesResult => ({type:DICING, dicesResult})