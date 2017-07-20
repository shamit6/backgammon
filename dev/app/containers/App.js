import { connect } from 'react-redux'
import AppViewer from '../components/App'
import { logout } from '../actions'

const mapStateToProps = (state, ownProps) => ({
  session:state.session
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => {
    dispatch(logout());
  }
})


const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppViewer)

export default App
