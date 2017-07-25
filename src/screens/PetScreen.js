import React from 'react';
import { View, Dimensions } from 'react-native';
import {Button, Spinner, Text, Container, Content,Label,Item, List, ListItem, Card, CardItem, Header, Icon, Left, Right, Body, Title, Footer} from 'native-base'
import { MapView, Permissions, Location} from 'expo';
import { Image } from 'react-native';
import { findRemove } from '../actions/actions';
import { fetchListReport } from '../actions/actions';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase';

class PetScreen extends React.Component{
  static navigationOptions = {
      title: 'Pet'
  }
  componentWillMount(){
      this.props.fetchListReport(this.props.navigation.state.params.pet.key)
  }

  renderImageList = (pet) => { 
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

  fetchMarkerReport = () => {
      return this.props.report.list.map((report, i) => {
          const { latitudeMarker, longitudeMarker,telefono,descr} = report
          return (
            <MapView.Marker
              key={i}
              title={telefono }             //NOTE: After validation, those if can be
              description={descr} //      removed
                coordinate={{
                    latitude: latitudeMarker,
                    longitude: longitudeMarker,
                }}
              pinColor= {'1D00F7'}
            />
          )
      })
  }

  printDeleteButtonIfOwner = (pet) => {
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
        if(this.props.report.isLoading)
            return(
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text></Text>
                    <Spinner color='blue' />
                </View>
            );
        const { pet } = this.props.navigation.state.params
        console.log('PET: '+ pet.key)

        const { width, height } = Dimensions.get('window');
        return(
            <Container>
                <Content>
                    <Card>
                        <CardItem cardBody>
                            <MapView
                                style={{ width, height: height-400 }}
                                showsUserLocation={false}
                                rotateEnabled={false}
                                zoomEnabled={true}
                                scrollEnabled={true}
                                showsUserLocation={true}
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
                          {this.renderImageList(pet)}
                        </CardItem>

                        <CardItem>
                            <Text>Smarrito in data {pet.duedate.split('T')[0]}</Text>
                        </CardItem>
                        <CardItem style={{flex: 1, justifyContent: 'center'}}>
                            <Button onPress={() => {
                                    this.props.navigation.navigate( "Report",{ key: pet.key })
                                }} block bordered style={{width:'100%'}}>
                                <Text >SEGNALA AVVISTAMENTO</Text>
                            </Button>
                          </CardItem>
                          <CardItem>
                            <Button onPress={() => {
                                    this.props.navigation.navigate("ReportList")
                                }} block bordered style={{width:'100%'}}>
                                <Text >LISTA AVVISTAMENTI</Text>
                            </Button>
                        </CardItem>
                        {this.printDeleteButtonIfOwner(pet)}

                    </Card>
                </Content>
            </Container>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    report: state.report
})
export default connect(mapStateToProps, {findRemove, fetchListReport})(PetScreen);
