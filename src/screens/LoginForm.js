import { StackNavigator,NavigationActions } from "react-navigation";
import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Button, Text, Form, Item, Input, InputGroup, Label, Spinner, Header, Icon, Card,Body,Title,CardItem,Right} from 'native-base';
import { connect } from 'react-redux';
import { Image } from 'react-native'
import { loginUser,logoutUser } from '../actions/actions';
import ErrorCard from '../components/ErrorCard';
import firebase from 'firebase';
import { Permissions, Notifications } from 'expo';

async function registerForPushNotificationsAsync(idUser) {
const { existingStatus } = await Permissions.getAsync(Permissions.REMOTE_NOTIFICATIONS);
let finalStatus = existingStatus;
if (existingStatus !== 'granted') {
  const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
  finalStatus = status;
}

// Stop here if the user did not grant permissions
if (finalStatus !== 'granted') {
  return;
}

// Get the token that uniquely identifies this device
let tokenReturn = await Notifications.getExponentPushTokenAsync();
var token= tokenReturn.substring(tokenReturn.indexOf('[')+1,tokenReturn.indexOf(']'))

firebase.database().ref("/TokenUser")
.on("value", snap => {
  var idUserArray=new Array()
  snap.forEach((child) => {
    idUserArray.push(child.val().idUser)
  })
  if (idUserArray.indexOf(idUser) !== -1)
    return
  else{
    firebase.database().ref(`/TokenUser`)
      .push({idUser, token})
      .then((data) => {
        console.log("inserito")
      })
  }
})
}


const mapStateToProps = state => {

    return {
        auth:state.auth,
        pet: state.pet
    }
}

class LoginForm extends Component {



  renderPetList = () => {

      return this.props.pet.list.map((pet, i) => {
          const { currentUser } = firebase.auth();
          idUser=currentUser.uid
          if (idUser !== pet['idUser'])
            return

          const { title, descr,images } = pet
          console.log(this.props.pet)
          if(this.props.pet.isLoading){

              return (
                  <CardItem>
                      <Text>Caricamento in corso</Text>
                      <Spinner color='blue' />
                  </CardItem>
              )
          }
          return (
              <Card
                  key={i}
              >
                  <CardItem button={true} onPress={() => this.props.navigation.navigate( "Pet",{ pet: pet, idUser: pet['idUser'] })}>
                    <Image
                        source={{ uri: images[images.length-1] }}
                        resizeMode="cover"
                        style={{ height :80, width: 80}}
                    >
                  </Image>
                      <Text style={{marginLeft:10}}>{title}</Text>
                      <Right>
                          <Icon name="arrow-forward" />
                      </Right>
                  </CardItem>
              </Card>
          )
      })
  }

    state = {
        email: '',
        password: '',
        loginLoad: false,
        error_input_email: false,
        error_input_password: false
    }
    static navigationOptions = {
        title: 'Profilo'
    }

    handleAuthenticationError = () => {
        if(this.props.auth.error)
        return (
            <ErrorCard>
                {this.props.auth.error.message}
            </ErrorCard>
        )

    }

    handleLoginClickAuth = () => {

        this.props.loginUser(
            {
                email: 'a@a.it',
                password: 'aaaaaa',
                navigateTo: (screen) => this.props.navigation.navigate(screen)
            }
        )

    }

    handleAuthenticationPosition=  async () => {
      const { currentUser } = firebase.auth();
      idUser=currentUser.uid
      registerForPushNotificationsAsync(idUser)
    }



    render(){

        if(this.props.auth.isLoading)
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text></Text>
                <Spinner color='blue' />
            </View>
        );
        if( this.props.auth.isLogged ){
          this.handleAuthenticationPosition()
          return(
              <Container>
                  <Content>
                      <Card>
                          <CardItem>
                              <Item stackedLabel style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                                  <Button style={{marginTop:20}} block primary onPress={() =>  this.props.navigation.navigate("Create") }>
                                      <Text>DEBUG CreateFind</Text>
                                  </Button>
                              </Item>
                          </CardItem>
                          {this.renderPetList()}
                          <CardItem>
                              <Item stackedLabel style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                  <Button style={{marginTop:20}} block primary onPress={() =>   this.props.logoutUser() }>
                                      <Text>LOGOUT </Text>
                                  </Button>
                              </Item>
                          </CardItem>

                          <Text>LOGIN EFFETTUATO</Text>
                      </Card>
                  </Content>
              </Container>
          );
        }
        return(

            <Container>
                <Content>
                    <Card>


                        {this.handleAuthenticationError()}
                        <CardItem>
                            <Item stackedLabel error={this.state.error_input_email} style={{ flex:1 }}>
                                <Label>Email</Label>
                                <Input onChangeText={(email) =>{
                                    if( email=== '')
                                      this.setState({error_input_email:true})
                                    else
                                      this.setState({email,error_input_email:false})
                                    }}
                                    keyboardType= 'email-address'
                                />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item stackedLabel error={this.state.error_input_password} style={{ flex:1 }}>
                                <Label>Password</Label>
                                <Input
                                   secureTextEntry={true}
                                   onChangeText={(password) =>{
                                    if(password === '')
                                      this.setState({error_input_password:true})
                                    else
                                      this.setState({error_input_password:false, password})


                                  }}

                              />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item stackedLabel style={{ flex:1 }}>
                                <Button block primary onPress={() =>{
                                    if(this.state.email === '')
                                      this.setState({error_input_email: true})
                                    if (this.state.password === '')
                                      this.setState({error_input_password: true})
                                    if (this.state.email !== '' && this.state.password !== '')
                                      this.props.loginUser(
                                      {
                                          email: this.state.email,
                                          password: this.state.password,
                                          navigateTo: (screen) => this.props.navigation.navigate(screen)
                                      }
                                )}}>
                                <Text>Log in</Text>
                            </Button>
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item stackedLabel style={{ flex:1 }}>
                            <Button style={{marginTop:20}} block primary onPress={() => {
                                this.props.loginUser(
                                    {
                                        email: 'a@a.it',
                                        password: 'aaaaaa',
                                        navigateTo: (screen) => this.props.navigation.navigate(screen)
                                    }
                                )
                            }}>
                                <Text>DEBUG Login ever true</Text>
                            </Button>
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item stackedLabel style={{ flex:1 }}>
                            <Button style={{marginTop:20}} block primary onPress={() => this.props.navigation.navigate("Signup") }>
                                <Text>Registrati</Text>
                            </Button>
                        </Item>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
}
};

/*
LoginForm.navigationOptions = ({ navigation }) => ({
    title: "Login"
    // headerLeft: <Button title="Login" onPress={() => navigation.goBack()} />,
});
*/
const style = StyleSheet.create({
    login:{
        width:'80%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default connect(mapStateToProps, { loginUser,logoutUser })(LoginForm);
