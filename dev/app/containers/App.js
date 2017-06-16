import { connect } from 'react-redux'
import AppViewer from '../components/AppViewer'
import { logout } from '../actions'

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn:state.session.isLoggedIn
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => {
  	// Is it ok to put it hehe?
  	localStorage.removeItem("ShubappBackgammonUsermame");
    dispatch(logout());
  }
})


const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppViewer)

export default App