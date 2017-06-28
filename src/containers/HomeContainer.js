import {connect} from 'react-redux';
import { userProfileInformation, setUserLocation, logoutUser,setUserMarker,findListFetch } from '../actions/actions';
import HomeScreen from '../screens/HomeScreen';
const mapStateToProps = state => {
    const petList = Object.keys(state.pet.petList).map(id => {
        return { ...state.pet.petList[id] }
    });
    return{
        user: state.user,
        pet: petList
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
