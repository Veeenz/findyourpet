import React, { Component } from 'react';
import {Button, Input,Container, Content,Label,Item, Card, CardItem, List, ListItem, Header, Icon, Left, Right, Body,Title} from 'native-base'
import { View, Image, TouchableOpacity, ScrollView, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { findCreate } from '../actions/actions';
import { ImagePicker, Location, MapView, Permissions } from 'expo';


class Signin extends Component {
    static navigationOptions = {
        title: 'Registrazione'
    }
    state = {
      email: "",
      emailV: "",
      password: "",
      passowrdV: "",
      error_input_email: false,
      error_input_emailV: false,
      error_input_password: false,
      error_input_passwordV: false,
    }

    componentWillMount(){
      console.log("Componente Registrazione creato")

    }


    render() {
        const { width, height } = Dimensions.get('window');
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem cardBody>
                            <Item stackedLabel  error={this.state.error_input_email} style={{ flex:1 }}>
                                <Label> Email </Label>
                                <Input
                                    label="Email"
                                    placeholder="Inserisci la tua email"
                                    onChangeText={email =>{
                                        if( email === '')
                                            this.setState({error_input_email:true})
                                        else
                                            this.setState({
                                                email,
                                                error_input_emailV:false
                                            })
                                    }}
                                />
                            </Item>
                        </CardItem>
                        <CardItem cardBody>
                            <Item stackedLabel  error={this.state.error_input_emailV} style={{ flex:1 }}>
                                <Label> Email di verifica </Label>
                                <Input
                                    label="Email"
                                    placeholder="Inserisci nuovamente la tua email"
                                    onChangeText={emailV =>{
                                        if( emailV === '')
                                            this.setState({error_input_emailV:true})
                                        else
                                            this.setState({
                                                emailV,
                                                error_input_emailV:false
                                            })
                                    }}
                                />
                            </Item>
                        </CardItem>
                        <CardItem cardBody>
                            <Item stackedLabel  error={this.state.error_input_password} style={{ flex:1 }}>
                                <Label> Password </Label>
                                <Input
                                    label="Password"
                                    placeholder="Inserisci la password da te scelta"
                                    secureTextEntry={true}
                                    onChangeText={password =>{
                                        if( password === '')
                                            this.setState({error_input_password:true})
                                        else
                                            this.setState({
                                                password,
                                                error_input_password:false
                                            })
                                    }}
                                />
                            </Item>
                        </CardItem>
                        <CardItem cardBody>
                            <Item stackedLabel  error={this.state.error_input_passwordV} style={{ flex:1 }}>
                                <Label> Password </Label>
                                <Input
                                    label="Password"
                                    placeholder="Inserisci uovamente la password da te scelta"
                                    secureTextEntry={true}
                                    onChangeText={passwordV =>{
                                        if( passwordV === '')
                                            this.setState({error_input_passwordV:true})
                                        else
                                            this.setState({
                                                passwordV,
                                                error_input_passwordV:false
                                            })
                                    }}
                                />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item style={{flex:1}}>
                                <Button onPress={() => {
                                    if (this.state.email === '')
                                        this.setState({error_input_email: true})
                                    if (this.state.emailV === '')
                                        this.setState({error_input_emailV: true})
                                    if (this.state.password === '')
                                        this.setState({error_input_password: true})
                                    if (this.state.passwordV === '')
                                        this.setState({error_input_passwordV: true})

                                    if (this.state.email !== this.state.emailV)
                                      this.setState({error_input_email: true,error_input_emailV:true},() => alert('L\'email di verifica è diversa da quella inserita precedentemente'))
                                    if (this.state.password !== this.state.passwordV)
                                      this.setState({error_input_password: true, error_input_passwordV:true},() => alert('La password da te inserita è diversa da quella di verifica'))



                                    if (this.state.email !== '' && this.state.emailV !== '' &&
                                    this.state.password !== '' && this.state.passwordV !== '' &&
                                    this.state.email === this.state.emailV && this.state.password === this.state.passwordV)
                                      alert("ok")

                                }}
                                style={{flex:1,justifyContent: 'center'}}
                                >
                                    <Text>
                                        Registrati
                                    </Text>
                                </Button>
                            </Item>
                        </CardItem>
                    </Card>

                </Content>
            </Container>
        )
    }
}

//export default connect(null, { findCreate }) (CreateFind);
export default Signin;