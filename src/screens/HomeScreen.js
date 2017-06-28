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
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
