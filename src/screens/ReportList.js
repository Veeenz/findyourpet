import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Text, Icon, Right, Button, Label } from 'native-base';
import { View, Dimensions } from 'react-native';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import {fetchListReport} from '../actions/actions';
import firebase from 'firebase';

class ReportList extends Component {
    static navigationOptions = {
        title: 'Segnalazioni'
    }
    renderPetReportList = () => {
        if(this.props.report.list.length == 0){
            return (
                <Card>
                    <CardItem style={{flex: 1, justifyContent:'center', alignItems:'center', alignSelf:'center'}}>
                        <Text>
                            Nessun avvistamento per questo animale
                        </Text>
                    </CardItem>
                </Card>
            )
        }
        return this.props.report.list.map((report) => {
            const { email, descr, telefono, date } = report

            return (
                <Card>
                    <CardItem>
                        <Text style={{marginLeft:10}}>
                            Email: {email}
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Text style={{marginLeft:10}}>
                            Messaggio: {descr}
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Text style={{marginLeft:10}}>
                            Recapito telefonico: {telefono}
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Text style={{marginLeft:10}}>
                            Data: {date.replace('T',' ').split('.')[0]}
                        </Text>
                    </CardItem>
                </Card>
            )
        })
    }
    render() {
        const { width, height } = Dimensions.get('window');
        return (
            <Container>
                <Content>
                    {this.renderPetReportList()}
                </Content>
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    report: state.report
})
export default connect(mapStateToProps, null)(ReportList)
