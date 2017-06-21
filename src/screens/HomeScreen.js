import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import {Button} from 'native-base'
import {connect} from 'react-redux';
import { userProfileInformation, setUserLocation, logoutUser,setUserMarker,findListFetch } from '../actions/actions';
import { MapView, Permissions, Location } from 'expo';

import firebase from 'firebase';

const mapStateToProps = state => ({
    user: state.user,
    pet: state.pet
})
const mapDispatchToProps = dispatch => ({
  userProfileInformation: () => dispatch(userProfileInformation()),
  setUserLocation:(coordinates) => dispatch(setUserLocation(coordinates)),
  setUserMarker:(coordinates) => dispatch(setUserMarker(coordinates)),
  logoutUser: () => dispatch(logoutUser()),
  findListFetch: () => dispatch(findListFetch())
})

class HomeScreen extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.userProfileInformation()
    this.retrieveUserLocation()
    console.log("COMPONENTE MAPPA STA PER ESSERE MONTATO")
    console.log(this.props.user)
    //console.log(this.props.logoutUser())

  }



  retrieveUserLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ errorMessage: 'Permesso negato'});
    }

    let location = await Location.getCurrentPositionAsync({});
    this.props.setUserLocation(location.coords);
  }

  handleClickButton = () => {
    this.props.findListFetch();
  }

  render(){
    const { width, height } = Dimensions.get('window');
    const { latitude, longitude } = this.props.user
    return(
      <View>
        <Button onPress={() => this.handleClickButton()}><Text>Hello</Text></Button>
        <MapView
          style={{ width, height: height-200 }}
          showsUserLocation={true}
          region={{
            latitude: this.props.user.latitude,
            longitude: this.props.user.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}

        >
        <MapView.Marker draggable
          coordinate={{
            latitude: this.props.user.latitude,
            longitude: this.props.user.longitude,
          }}
          onDragEnd={(e) => { this.props.setUserMarker(e.nativeEvent.coordinate); }}
        />
        </MapView>
        <Text> Hello {this.props.user.email}</Text>
        <Text> Coordinate longitude {this.props.user.longitude}</Text>
        <Text> Coordinate latitude {this.props.user.latitude}</Text>
        <Text> Coordinate longitudeMarker {this.props.user.longitudeMarker}</Text>
        <Text> Coordinate latitudeMarker {this.props.user.latidudeMarker}</Text>

      </View>

    );
  }
}







export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
