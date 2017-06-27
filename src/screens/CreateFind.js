import React, { Component } from 'react';
import {  CardSection,} from '../components/common';
import DatePicker from 'react-native-datepicker'
import {Button, Input,Container, Content,Label,Item, Card, CardItem, List, ListItem, Header, Icon, Left, Right, Body,Title} from 'native-base'
import { View, Image, TouchableOpacity, ScrollView, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { findCreate } from '../actions/CreateActions';
import { ImagePicker, Location, MapView, Permissions } from 'expo';

class CreateFind extends Component {
  static navigationOptions = {
    title: 'Create Find'
  }
  state = {
    title: '',
    location: '',
    duedate: new Date().toISOString(),
    items: [1,2,3,4],
    image: 'https://facebook.github.io/react/img/logo_og.png',
    descr: '',
    latitudeMarker: 0.0,
    longitudeMarker: 0.0,
    latitude: 37.525729,
          longitude: 15.072030,

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
      <Container>
        <Content>
            <Header>
               <Body>
                   <Title>CreateFind</Title>
               </Body>
            </Header>
        <Card>

         <CardItem cardBody>
                 <Item stackedLabel style={{ flex:1 }}>
                     <Label> Titolo </Label>
                     <Input
                         label="Titolo Ricerca"
                         placeholder="Titolo della ricerca"
                         value={this.state.title}
                         onChangeText={text => this.setState({ title: text })}
                     />
                 </Item>
         </CardItem>

        <CardItem cardBody>
            <MapView
              style={{ width, height: height-400 }}
              showsUserLocation={true}
              loadingEnabled={true}
              initialRegion={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0,
                longitudeDelta: 0.0,
              }}

              //onRegionChangeComplete={(region) => this.setState({latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta})}
            >

            <MapView.Marker draggable
              coordinate={{
                latitude: this.state.latitudeMarker,
                longitude: this.state.longitudeMarker,
              }}
              onDragEnd={(e) => { this.setState({ latitudeMarker: e.nativeEvent.coordinate.latitude, longitudeMarker: e.nativeEvent.coordinate.longitude }, () =>
              fetch('http://maps.googleapis.com/maps/api/geocode/json?latlng='+this.state.latitudeMarker+','+this.state.longitudeMarker+'&sensor=true')
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log("Risultato: " + responseJson.results[1].formatted_address)
                  this.setState({location: responseJson.results[1].formatted_address})

                })
                .catch((error) => {
                  console.log("ERROR: " + error);
                })
            )}
          }

            />
            </MapView>
          </CardItem>

            <CardItem>
              <Item stackedLabel style={{ flex:1 }}>
                <Label> Posizione </Label>
                <Input
                  label="Location"
                  placeholder='Where did you lose your buddy?'
                  value={this.state.location}
                  onChangeText={text => this.setState({ location: text })}

                />
              </Item>
            </CardItem>
            <CardItem>
            <Item stackedLabel>
                <Label>
                  Inserisci le foto del tuo animali,fino a 5
                </Label>

                  <List horizontal={true} dataArray={this.state.items}
                        renderRow={(item) =>
                            <ListItem button onPress = {() => console.log('click on image')}>
                                <Image
                                  source={{ uri:this.state.image }}
                                  resizeMode="cover"

                                  style={{ height :100, width: 200}}
                                  >
                                </Image>
                            </ListItem>
                        }>
                  </List>
              </Item>
            </CardItem>
            <CardItem>
              <Item stackedLabel  style={{ flex:1 }}>
              <Label>
                Quando hai perso il tuo animale?
              </Label>
                <DatePicker
                  style={{ flex: 1, width:'100%' }}
                  date={this.state.duedate}
                  mode="date"
                  placeholder="Dove hai perso il tuo animale?"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"

                  onDateChange={(date) => {this.setState({duedate: date})}}
                />
            </Item>
            </CardItem>
            <CardItem>
            <Item stackedLabel style={{ flex:1 }}>
              <Label>Descrizione</Label>
            <Input
              style={{ flex: 1, height:200 }}
              placeholder='Inserisci più dettagli'
              value={this.state.descr}
              multiline={true}
              onChangeText={text => this.setState({ descr: text })}

            />
          </Item>
        </CardItem>



        <CardItem>
          <Item style={{flex:1}}>
            <Button onPress={() => this.props.findCreate({
                title: this.state.title,
                location: this.state.location,
                duedate: this.state.duedate,
                descr: this.state.descr,
                image: this.state.image,
                latitudeMarker: this.state.latitudeMarker,
                longitudeMarker: this.state.longitudeMarker,
                navigateBack: () => this.props.navigation.goBack()
              })}
              style={{flex:1,justifyContent: 'center'}}
              >
              <Text>
                Add Find
              </Text>
            </Button>
          </Item>
        </CardItem>
        </Card>

    </Content>
    </Container>
    )
  }
}

export default connect(null, { findCreate }) (CreateFind);
