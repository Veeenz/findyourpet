import React from 'react';
import { View, Dimensions } from 'react-native';
import {Button, Text, Container, Content,Label,Item, List, ListItem, Card, CardItem, Header, Icon, Left, Right, Body, Title, Footer} from 'native-base'
import { MapView, Permissions, Location} from 'expo';
import { Image } from 'react-native'

class PetScreen extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { pet } = this.props.navigation.state.params
        const { width, height } = Dimensions.get('window');
        console.log(pet);
        return(
            <Container>
                <Content>
                    <Card>
                        <CardItem cardBody>
                            <MapView
                                style={{ width, height: height-400 }}
                                rotateEnabled={false}
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
                            <Item>
                                <List
                                      horizontal={true}
                                      dataArray={[1,2,3]}
                                      renderRow={(item) =>
                                          <ListItem button onPress = {() => console.log('click on image')}>
                                              <Image
                                                source={{ uri:pet.image }}
                                                resizeMode="cover"
                                                style={{ height :180, width: 300}}
                                                >
                                              </Image>
                                          </ListItem>
                                      }
                                >
                                </List>
                            </Item>
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
