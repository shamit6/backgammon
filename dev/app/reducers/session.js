import { LOG_IN, LOG_OUT } from '../actions';
import { getInitialSessionState } from '../constants';

const reducer = (state = getInitialSessionState(), action) => {

	switch (action.type){
		case LOG_IN:{
			return  {isLoggedIn:true, user:action.content};
		}

		case LOG_OUT:{
			return { isLoggedIn:false };
		}

		default:
      		return state
	}
}

export default reducer;
