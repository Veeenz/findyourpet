import React from 'react';
import { View, Text, Dimensions, Button } from 'react-native';
import {connect} from 'react-redux';
import { userProfileInformation, setUserLocation, logoutUser } from '../actions/actions';
import { MapView, Permissions, Location } from 'expo';


const mapStateToProps = state => ({
    user: state.user
})
const mapDispatchToProps = dispatch => ({
  userProfileInformation: () => dispatch(userProfileInformation()),
  setUserLocation:(coordinates) => dispatch(setUserLocation(coordinates)),
  logoutUser: () => dispatch(logoutUser())
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

  render(){
    const { width, height } = Dimensions.get('window');
    const { latitude, longitude } = this.props.user
    return(
      <View>

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
        </MapView>
        <Text> Hello {this.props.user.email}</Text>
        <Text> Coordinate longitude {this.props.user.longitude}</Text>
        <Text> Coordinate latitude {this.props.user.latitude}</Text>
      </View>

    );
  }
}

HomeScreen.navigationOptions = ({navigation}) => ({
  title: 'TodoList bisijor',
  headerLeft: <Button title="Logout"
      onPress={() => this.props.logoutUser()}
    />,
  headerRight: <Button title="Add"
      onPress={() => navigation.navigate('todoCreate')}
    />
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
