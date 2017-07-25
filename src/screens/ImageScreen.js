import React, { Component } from 'react';
import {Button, Input,Container, Content,Label,Item, Card, CardItem, List,Spinner, ListItem, Header, Icon, Left, Right, Body,Title} from 'native-base'
import { View, Image, TouchableOpacity, ScrollView, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { SignUpUser } from '../actions/actions';
import { ImagePicker, Location, MapView, Permissions } from 'expo';



class ImageScreen extends Component{
  static navigationOptions = {
      title: 'Photo'
  }

  render(){
    const { image } = this.props.navigation.state.params
    const { width, height } = Dimensions.get('window');
    return(
      <Container>
        <Content>
          <Image
              source={{ uri: image }}
              resizeMode="cover"
              style={{ height :height, width: width}}
              >
              </Image>

      </Content>
    </Container>




    )
  }
}


export default ImageScreen
