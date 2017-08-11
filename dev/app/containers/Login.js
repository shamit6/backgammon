import { connect } from 'react-redux'
import LoginViewer from '../components/Login'
import { login } from '../actions'


const mapStateToProps = (state, ownProps) => ({
  isLoggedIn:state.session.isLoggedIn
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: (user) => {
    dispatch(login(user));
  }
})

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginViewer)

export default Login
