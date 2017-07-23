import React, { Component } from 'react';
import {  CardSection,} from '../components/common';
import DatePicker from 'react-native-datepicker'
import {Button, Input,Container, Content,Label,Item, Card, CardItem, List, ListItem, Header, Icon, Left, Right, Body,Title} from 'native-base'
import { View, Image, TouchableOpacity, ScrollView, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { ReportCreate } from '../actions/actions';
import { ImagePicker, Location, MapView, Permissions } from 'expo';

class ReportScreen extends Component {
    static navigationOptions = {
        title: 'Segnala'
    }
    state = {
        email: '',
        telefono: '',
        descr: '',
        latitudeMarker: 0.0,
        longitudeMarker: 0.0,
        latitude: 37.525729,
        longitude: 15.072030,

        error_input_email: false,
        error_input_descr: false,
        error_input_telefono: false
    }

    componentWillMount(){
        this.retrieveUserLocation()


    }


    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false
        });
        if (!result.cancelled) {
            this.setState({ images: this.state.images.concat(result.uri)});
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
    }

    render() {
        const { width, height } = Dimensions.get('window');
        const { key } = this.props.navigation.state.params
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                          <Label>
                            Segnala dove hai visto l'animale
                          </Label>

                        </CardItem>
                        <CardItem cardBody>
                            <MapView
                                style={{ width, height: height-400 }}
                                rotateEnabled={false}
                                showsUserLocation={true}
                                loadingEnabled={true}
                                initialRegion={{
                                    latitude: this.state.latitude,
                                    longitude: this.state.longitude,
                                    latitudeDelta: 4.0,
                                    longitudeDelta: 4.0,
                                }}
                                //onRegionChangeComplete={(region) => this.setState({latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta})}
                                >
                                    <MapView.Marker draggable
                                        coordinate={{
                                            latitude: this.state.latitudeMarker,
                                            longitude: this.state.longitudeMarker,
                                        }}
                                        onDragEnd={(e) => { this.setState({ latitudeMarker: e.nativeEvent.coordinate.latitude, longitudeMarker: e.nativeEvent.coordinate.longitude }
                                    )}}

                            />
                        </MapView>
                    </CardItem>

                        <CardItem >
                            <Item stackedLabel  error={this.state.error_input_email} style={{flex: 1, flexDirection:'column'}}>
                                <Label>
                                    Indirizzo e-mail
                                </Label>
                                <Input
                                    style={{ flex: 1 }}
                                    placeholder='Inserisci il tuo indirizzo e-mail per essere contattato'
                                    multiline={true}
                                    keyboardType= 'email-address'
                                    onChangeText={text => text === '' || this.state.email.indexOf('@') !== -1 ? this.setState({error_input_email: true}) : this.setState({ email: text, error_input_email: false })}
                                />
                            </Item>
                        </CardItem>

                        <CardItem >
                            <Item stackedLabel  error={this.state.error_input_telefono} style={{flex: 1, flexDirection:'column'}}>
                                <Label>
                                    Numero di telefono
                                </Label>
                                <Input
                                    style={{ flex: 1 }}
                                    placeholder='Inserisci il tuo numero di telefono per essere contattato'
                                    multiline={true}
                                    keyboardType= 'numeric'
                                    onChangeText={text => text === '' ? this.setState({error_input_telefono: true}) : this.setState({ telefono: text, error_input_telefono: false })}
                                />
                            </Item>
                        </CardItem>



                          <CardItem >
                              <Item stackedLabel  error={this.state.error_input_descr} style={{flex: 1, flexDirection:'column'}}>
                                  <Label>
                                      Descrizione
                                  </Label>
                                  <Input
                                      style={{ flex: 1, height:200 }}
                                      placeholder='Inserisci più dettagli del avvistamento'
                                      multiline={true}
                                      onChangeText={text => text === '' ? this.setState({error_input_descr: true}) : this.setState({ descr: text, error_input_descr: false })}
                                  />
                              </Item>
                        </CardItem>
                        <CardItem>
                            <Item style={{flex:1}}>
                                <Button onPress={() => {
                                    if (this.state.email === '' ||  this.state.email.indexOf('@') === -1)
                                        this.setState({error_input_email: true})
                                    if (this.state.telefono === '')
                                        this.setState({error_input_telefono: true})
                                    if (this.state.descr === '')
                                        this.setState({error_input_descr: true})
                                    if (this.state.latitudeMarker === 0.0 && this.state.longitudeMarker === 0.0)
                                        alert('Perfavore posiziona il marker dove hai avvistato l\'animale')
                                    if (this.state.email !== '' && this.state.email.indexOf('@') !== -1 &&this.state.telefono !== '' && this.state.descr !== '' && (this.state.latitudeMarker !== 0.0 || this.state.longitudeMarker !== 0.0)){
                                        this.props.ReportCreate({
                                            email: this.state.email,
                                            telefono: this.state.telefono,
                                            descr: this.state.descr,
                                            latitudeMarker: this.state.latitudeMarker,
                                            longitudeMarker: this.state.longitudeMarker,
                                            idFind: key,
                                            navigateBack: () => this.props.navigation.goBack()
                                        })
                                      }
                                }}
                                style={{flex:1,justifyContent: 'center'}}
                                >
                                    <Text>
                                        Aggiungi Segnalazione
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

export default connect(null, { ReportCreate }) (ReportScreen);
