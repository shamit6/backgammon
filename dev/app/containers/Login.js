import { connect } from 'react-redux'
import LoginViewer from '../components/LoginViewer'
import { login } from '../actions'

const mapStateToProps = (state, ownProps) => ({
  //isEnabled: (state.clientTurn && !state.diced),
  isLoggedIn:state.session.isLoggedIn
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: (username, rememberMe) => {

  	if (rememberMe){
  		localStorage.setItem("ShubappBackgammonUsermame" , username);
  	}

    dispatch(login(username));
  }
})

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginViewer)

export default Login