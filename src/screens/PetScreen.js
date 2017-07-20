import React from 'react';
import { View, Dimensions } from 'react-native';
import {Button, Text, Container, Content,Label,Item, List, ListItem, Card, CardItem, Header, Icon, Left, Right, Body, Title, Footer} from 'native-base'
import { MapView, Permissions, Location} from 'expo';
import { Image } from 'react-native'

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

    constructor(props){
        super(props);
    }

    render(){
        const { pet } = this.props.navigation.state.params
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
                            <Button block bordered style={{width:'100%'}}>
                                <Text>Press me</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default PetScreen;
