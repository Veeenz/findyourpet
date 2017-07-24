import {connect} from 'react-redux';
import { userProfileInformation, setUserLocation, logoutUser,setUserMarker,findListFetch } from '../actions/actions';
import HomeScreen from '../screens/HomeScreen';
const mapStateToProps = state => {

    return{
        user: state.user,
        pet: state.pet,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    userProfileInformation: () => dispatch(userProfileInformation()),
    setUserLocation:(coordinates) => dispatch(setUserLocation(coordinates)),
    setUserMarker:(coordinates) => dispatch(setUserMarker(coordinates)),
    logoutUser: () => dispatch(logoutUser()),
    findListFetch: () => dispatch(findListFetch())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
