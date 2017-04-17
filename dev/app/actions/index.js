export const SWITCH_TURN = "SWITCH_TURN";
export const STEP = "STEP";
export const DICING = "DICING";

export const switchTurn = () => ({type:SWITCH_TURN})
export const step = step => ({type:STEP, content: step})
export const dice = dicesResult => ({type:DICING, content: dicesResult})

export const switchTurnAsync = time => (dispatch, time) => {
	    setTimeout(() => {
      dispatch(switchTurn())
    }, 4000)
}
