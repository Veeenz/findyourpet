import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import {Button,Container, Content,Label,Item, Fab, Card, CardItem, Header, Icon, Left, Right, Body,Title, Spinner} from 'native-base'
import { MapView, Permissions, Location } from 'expo';
import firebase from 'firebase';


class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            active: true
        };
    }
    componentWillMount(){
        //this.props.userProfileInformation()
        this.retrieveUserLocation()
        if (this.props.pet.list.length == 0)
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

    markersRender = () => {
        return this.props.pet.list.map((pet, i) => { // TODO: Need to find a better way to manage this
            const { title, descr, latitudeMarker, longitudeMarker } = pet
            return (<MapView.Marker
                key={i}
                title={title !== "" ? title : 'Title not defined' }             //NOTE: After validation, those if can be
                description={descr !== "" ? descr : 'Description not provided'} //      removed
                onPress={() => this.props.navigation.navigate( "Pet",{ pet: pet })}
                coordinate={{
                    latitude: latitudeMarker,
                    longitude: longitudeMarker
                }}
            />)
        })
    }

    render(){
        if (this.props.pet.isLoading)
            return(
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Caricamento in corso...</Text>
                    <Spinner color='blue' />
                </View>
            );
        const { width, height } = Dimensions.get('window');
        const { latitude, longitude, longitudeMarker, latidudeMarker } = this.props.user
        return(
            <Container>
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
                                    {this.markersRender()}
                            </MapView>

                        </CardItem>
                        <Fab
                            active={this.state.active}
                            direction="down"
                            containerStyle={{ }}
                            style={{ flex: 1, backgroundColor: '#5067FF' }}
                            position="topRight"
                            onPress={() => {
                                this.setState({ active: !this.state.active })
                                this.props.navigation.navigate('Create')
                            }}>
                            <Icon name="add" />

                        </Fab>
                    </Card>
                </Content>
            </Container>
                );
            }
        }

HomeScreen.navigationOptions = ({ navigation }) => ({
    title: "Map"
    // headerLeft: <Button title="Login" onPress={() => navigation.goBack()} />,
    });
export default HomeScreen;
