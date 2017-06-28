import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import {Button,Container, Content,Label,Item, Card, CardItem, Header, Icon, Left, Right, Body,Title} from 'native-base'
import { MapView, Permissions, Location } from 'expo';
import firebase from 'firebase';


class HomeScreen extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        //this.props.userProfileInformation()
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
            const { title, descr, latitudeMarker, longitudeMarker } = this.props.pet[key]
            return (<MapView.Marker
                key={key}
                title={title !== "" ? title : 'Title not defined' }             //NOTE: After validation, those if can be
                description={descr !== "" ? descr : 'Description not provided'} //      removed
                onPress={() => this.props.navigation.navigate("Pet",{pet: this.props.pet[key]})}
                coordinate={{
                    latitude: latitudeMarker,
                    longitude: longitudeMarker
                }}
            />)
        })
    }

    render(){
        const { width, height } = Dimensions.get('window');
        const { latitude, longitude, longitudeMarker, latidudeMarker } = this.props.user
        return(
            <Container>
                <Header>
                    <Body>
                        <Title>Maps</Title>
                    </Body>
                </Header>
                <Content>
                    <Card>
                        <CardItem cardBody>
                            <MapView
                                style={{ width, height: height }}
                                showsUserLocation={true}
                                rotateEnabled={false}
                                initialRegion={{
                                    latitude: 41.9097306,
                                    longitude: 12.2558141,
                                    latitudeDelta: 12.3422,
                                    longitudeDelta: 12.3221,
                                }}
                                >
                                    {this.markerRender()}
                            </MapView>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
                );
            }
        }
export default HomeScreen;
