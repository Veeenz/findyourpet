import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Text, Icon, Right, Button, Label } from 'native-base';
import { View, Dimensions } from 'react-native';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import {fetchListReport} from '../actions/actions';
import firebase from 'firebase';

class ReportList extends Component {
    renderPetReportList = (key) => {
      var ArrayReturn= new Array()
      firebase.database().ref("/ReportList")
      .on("value", snap => {
        snap.forEach((child) => {
          if(child.val().idFind === key){
            ArrayReturn.push({email: child.val().email, descr: child.val().descr, telefono: child.val().telefono})
          }
        })
        return  Object.keys(ArrayReturn).map((id) => {
            const { email, descr, telefono } = ArrayReturn[id]
            console.log(email)
            console.log(telefono)
            return (
                <Card>
                    <CardItem>
                      <Label>
                        Segnala dove hai visto l'animale
                      </Label>
                      <Image/>
                      <Text style={{marginLeft:10}}>
                        {descr}
                      </Text>
                      <Text style={{marginLeft:10}}>
                        {telefono}
                      </Text>
                      <Text style={{marginLeft:10}}>
                        {email}
                      </Text>
                    </CardItem>
                </Card>
            )
        })


      })

    }
    render() {
      const { key } = this.props.navigation.state.params
      const { width, height } = Dimensions.get('window');
        return (
            <Container>
                <Content>
                  {this.renderPetReportList(key)}
                </Content>
            </Container>
        );
    }
}

export default connect(null, null)(ReportList)
