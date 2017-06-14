import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from '../components/common';
import DatePicker from 'react-native-datepicker'
import { View, Image, TouchableOpacity, ScrollView, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { findCreate } from '../actions/CreateActions';
import { ImagePicker, Location, MapView, Permissions } from 'expo';







class CreateFind extends Component {
  static navigationOptions = {
    title: 'New Find'
  }
  state = {
    title: '',
    location: '',
    duedate: new Date().toISOString(),
    image: 'https://facebook.github.io/react/img/logo_og.png',
    descr: '',
    latitudeMarker: 0.0,
    longitudeMarker: 0.0,
    latitude: 0.0,
    longitude: 0.0
  }

  componentWillMount(){
    this.retrieveUserLocation()


  }


  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };


  retrieveUserLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ errorMessage: 'Permesso negato'});
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({latitude: location.coords.latitude, longitude: location.coords.longitude})
    this.setState({latitudeMarker: location.coords.latitude, longitudeMarker: location.coords.longitude})
    fetch('http://maps.googleapis.com/maps/api/geocode/json?latlng='+this.state.latitudeMarker+','+this.state.longitudeMarker+'&sensor=true')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.results[1].formatted_address)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <ScrollView>
        <Card>
          <CardSection>
            <Input
              label="Titolo Ricerca"
              placeholder="Titolo della ricerca"
              value={this.state.title}
              onChangeText={text => this.setState({ title: text })}
            />
          </CardSection>


            <MapView
              style={{ width, height: height-400 }}
              showsUserLocation={true}
              region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}

            >
            <MapView.Marker draggable
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
              onDragEnd={(e) => { this.setState({ latitudeMarker: e.nativeEvent.coordinate.latitude, longitudeMarker: e.nativeEvent.coordinate.longitude })
              fetch('http://maps.googleapis.com/maps/api/geocode/json?latlng='+this.state.latitudeMarker+','+this.state.longitudeMarker+'&sensor=true')
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log(responseJson.result)
                  this.setState({location: responseJson.results[1].formatted_address})

                })
                .catch((error) => {
                  console.error(error);
                });
            }
          }

            />
            </MapView>


            <Input
              label="Location"
              placeholder='Where did you lose your buddy?'
              value={this.state.location}
              onChangeText={text => this.setState({ location: text })}
            />

          <CardSection>
            <Input
              label="Descrizione Ricerca"
              placeholder='Descrivi il tuo animale, segni particolari ecc allegando più foto possibili'
              value={this.state.descr}
              onChangeText={text => this.setState({ descr: text })}
              style={{ height: 200, width: 300 }}
            />
          </CardSection>
          <Text>
            Quando hai perso il tuo animale?
          </Text>

          <CardSection>

            <DatePicker
              style={{ flex: 1 }}
              date={this.state.duedate}
              mode="date"
              placeholder="Dove hai perso il tuo animale?"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  marginLeft: 120
                }
              }}
              onDateChange={(date) => {this.setState({duedate: date})}}
            />

          </CardSection>
            <Image />
            <Text>
              Inserisci le foto del tuo animali,fino a 5
            </Text>
          <CardSection>

            <TouchableOpacity
              onPress={this._pickImage}
              >
              <ScrollView
                horizontal={true}
              >
              <Image
                source={{ uri: this.state.image }}
                resizeMode="cover"
                style={{ height: 100, width: 200 }}
              />

              <Image
                source={{ uri: this.state.image }}
                resizeMode="cover"
                style={{ height: 100, width: 200 }}
              />
              </ScrollView>
            </TouchableOpacity>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.props.findCreate({
                title: this.state.title,
                location: this.state.location,
                duedate: this.state.duedate,
                descr: this.state.descr,
                image: this.state.image,
                latitudeMarker: this.state.latitudeMarker,
                longitudeMarker: this.state.longitudeMarker,
                navigateBack: () => this.props.navigation.goBack()
              })}>
              Add Find
            </Button>
          </CardSection>
        </Card>
      </ScrollView>
    )
  }
}

export default connect(null, { findCreate }) (CreateFind);
