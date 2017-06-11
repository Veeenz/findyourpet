import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import {connect} from 'react-redux';
import { userProfileInformation, setUserLocation } from '../actions/actions';
import { MapView, Permissions, Location } from 'expo';

const mapStateToProps = state => ({
    user: state.user
})
const mapDispatchToProps = dispatch => ({
  userProfileInformation: () => dispatch(userProfileInformation()),
  setUserLocation:(coordinates) => dispatch(setUserLocation(coordinates)),
})

class HomeScreen extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.userProfileInformation()
    this.retrieveUserLocation()

  }

  retrieveUserLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ errorMessage: 'Permesso negato'});
    }

    let location = await Location.getCurrentPositionAsync({});
    this.props.setUserLocation(location.coords);
  }

  render(){
    const { width, height } = Dimensions.get('window');
    const { latitude, longitude } = this.props.user
    return(
      <View>

        <MapView
          style={{ width, height: height-200 }}
          region={{
            latitude: this.props.user.latitude,
            longitude: this.props.user.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        <MapView.Marker
          coordinate={{
            latitude: this.props.user.latitude || 10.10293,
            longitude: this.props.user.longitude || 10.0293, 
          }}
          title='Sei qui'
        />
        </MapView>
        <Text> Hello {this.props.user.email}</Text>
        <Text> Coordinate longitude {this.props.user.longitude}</Text>
        <Text> Coordinate latitude {this.props.user.latitude}</Text>
      </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
