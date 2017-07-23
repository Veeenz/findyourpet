import React from 'react';
import { View, Dimensions } from 'react-native';
import {Button, Text, Container, Content,Label,Item, List, ListItem, Card, CardItem, Header, Icon, Left, Right, Body, Title, Footer} from 'native-base'
import { MapView, Permissions, Location} from 'expo';
import { Image } from 'react-native';
import { findRemove } from '../actions/actions';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase';

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'MainScreen'})
  ]
})

class PetScreen extends React.Component{
  renderImageList = (pet) => {
      return Object.keys(pet.images).map((key) => {
          return (
              <Card>
                  <CardItem>
                      <Image
                          source={{ uri: pet.images[key] }}
                          resizeMode="cover"
                          style={{ height :80, width: 80}}
                      >
                      </Image>
                  </CardItem>
              </Card>
          )
      })
  }

  renderImageList2 = (pet) => {
  return(
    <List
        horizontal={true}
        dataArray={pet.images}
        renderRow={(image, i) =>{
            return (<ListItem
              onPress={() => this.props.navigation.navigate( "ImageScreen",{ image: image })}
              >
                <Image
                    source={{ uri: image }}
                    resizeMode="cover"
                    style={{ height :180, width: 300}}

                    >
                    </Image>
                </ListItem>
            )}}>
        </List>
    )
  }

  fetchMarkerReport= (key) => {
    var ArrayReturn = new Array()
    firebase.database().ref("/ReportList")
    .on("value", snap => {
      snap.forEach((child) => {
        if(child.val().idFind === key){
          ArrayReturn.push({latitudeMarker: child.val().latitudeMarker, longitudeMarker: child.val().longitudeMarker})
        }
      })
      return  Object.keys(ArrayReturn).map((id) => {
          const { latitudeMarker, longitudeMarker} = ArrayReturn[id]
          console.log('LIST MARKER')
          console.log(latitudeMarker)
          console.log(longitudeMarker)
          return (
            <MapView.Marker

              onPress={() => alert('test')}
                coordinate={{
                    latitude: latitudeMarker,
                    longitude: longitudeMarker,
                }}
              pinColor= {'1D00F7'}
            />
          )
      })


    })

  }

  printDeleteButtonIfLogged = () => {
      if(this.props.auth.user === null)
        return null
      if (this.props.auth.user.uid === this.props.navigation.state.params.idUser){
          console.log('should join')
          return (<CardItem style={{flex: 1, justifyContent: 'center'}}>
              <Button onPress={() => {
                      console.log('BEFORE JOIN FINDREMOVE')
                      console.warn('KEY VALUE FINDREMOVE: '+pet.key)
                      findRemove({
                          key: pet.key,
                          navigateBack: () => this.props.navigation.goBack()
                      })
                  }} block bordered style={{width:'100%'}}>
                  <Text>ELIMINA</Text>
              </Button>
          </CardItem>)
      }
  }

    constructor(props){
        super(props);
    }

    render(){
        const { pet,key } = this.props.navigation.state.params
        console.log('PET: '+ pet.key)
        console.log('KEY: '+key)
        const { width, height } = Dimensions.get('window');
        return(
            <Container>
                <Content>
                    <Card>
                        <CardItem cardBody>
                            <MapView
                                style={{ width, height: height-400 }}
                                rotateEnabled={false}
                                zoomEnabled={false}
                                scrollEnabled={false}
                                showsUserLocation={false}
                                loadingEnabled={true}
                                initialRegion={{
                                    latitude: pet.latitudeMarker,
                                    longitude: pet.longitudeMarker,
                                    latitudeDelta: 0.098,
                                    longitudeDelta: 0.098,
                                }}>
                                    <MapView.Marker
                                        coordinate={{
                                            latitude: pet.latitudeMarker,
                                            longitude: pet.longitudeMarker,
                                        }}
                                    />
                                  {this.fetchMarkerReport(pet.key)}
                                </MapView>
                        </CardItem>
                        <CardItem header>
                            <Text style={{fontSize: 26}}>{pet.title}</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>{pet.descr}</Text>
                            </Body>
                        </CardItem>

                        <CardItem cardBody>
                          {this.renderImageList2(pet)}
                        </CardItem>

                        <CardItem>
                            <Text>Smarrito in data {pet.duedate}</Text>
                        </CardItem>
                        <CardItem style={{flex: 1, justifyContent: 'center'}}>
                            <Button onPress={() => {
                                    findRemove({
                                        key: pet.key,
                                        navigateBack: () => this.props.navigation.goBack()
                                    })
                                }} block bordered style={{width:'50%'}}>
                                <Text >Press me</Text>
                            </Button>
                            <Button onPress={() => {
                                    this.props.navigation.navigate( "Report",{ key: pet.key })
                                }} block bordered style={{width:'50%'}}>
                                <Text >SEGNALA AVVISTAMENTO</Text>
                            </Button>
                          </CardItem>
                          <CardItem>
                            <Button onPress={() => {
                                    this.props.navigation.navigate( "ReportList",{ key: pet.key })
                                }} block bordered style={{width:'50%'}}>
                                <Text >LISTA AVVISTAMENTI</Text>
                            </Button>
                        </CardItem>
                        {this.printDeleteButtonIfLogged}

                    </Card>
                </Content>
            </Container>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {findRemove})(PetScreen);
