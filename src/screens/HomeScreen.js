import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import {Button,Container, Content,Label,Item, Card, CardItem, Header, Icon, Left, Right, Body,Title} from 'native-base'
import {connect} from 'react-redux';
import { userProfileInformation, setUserLocation, logoutUser,setUserMarker,findListFetch } from '../actions/actions';
import { MapView, Permissions, Location } from 'expo';
import firebase from 'firebase';

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

class HomeScreen extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.userProfileInformation()
    this.retrieveUserLocation()
    this.props.findListFetch()
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

  markerRender = () => {
      return Object.keys(this.props.pet).map((key) => { // TODO: Need to find a better way to manage this
          return (<MapView.Marker
                      key={key}
                      coordinate={{
                          latitude: this.props.pet[key].latitudeMarker,
                          longitude: this.props.pet[key].longitudeMarker
                      }}
                  />)
      })
  }

  render(){
    const { width, height } = Dimensions.get('window');
    const { latitude, longitude, longitudeMarker, latidudeMarker } = this.props.user
    return(
          >
          {this.markerRender()}

            
      <Container>
        <Content
          padder= {false}
          >
        <Card >
          <Header>
             <Body>
                 <Title>Maps</Title>
             </Body>
         </Header>
          <CardItem>
        <View>
          <Button onPress={() => this.handleClickButton()}><Text>Hello</Text></Button>
          <MapView
            style={{ width, height: height }}
            showsUserLocation={true}
            region={{
              latitude: this.props.user.latitude,
              longitude: this.props.user.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}

          >
          {this.markerRender()}
          </MapView>
          </View>

        </CardItem>
          </Card>
        </Content>
    </Container>



    );
  }
}







export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
