import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import {Button,Container, Content,Label,Item, Card, CardItem, Header, Icon, Left, Right, Body,Title} from 'native-base'
import { MapView, Permissions, Location } from 'expo';
import {connect} from 'react-redux';
const mapStateToProps = state => ({
    pet: state.pet
})

class PetScreen extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            null
        );
    }
}

export default connect(mapStateToProps, null)(PetScreen);
