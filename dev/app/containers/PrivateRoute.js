import { connect } from 'react-redux'
import PrivateRouteViewer from '../components/PrivateRoute'
import { logout } from '../actions';


const mapStateToProps = (state, ownProps) => ({
  isLoggedIn:state.app.session.isLoggedIn,
  userInfo:state.app.session.user
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => {
    dispatch(logout());
  }
})

const PrivateRoute = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRouteViewer)

export default PrivateRoute
