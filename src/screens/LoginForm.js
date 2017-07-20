import { StackNavigator,NavigationActions } from "react-navigation";
import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Button, Text, Form, Item, Input, InputGroup, Label, Spinner, Header, Icon, Card,Body,Title,CardItem,Right} from 'native-base';
import { connect } from 'react-redux';
import { Image } from 'react-native'
import { loginUser,logoutUser } from '../actions/actions';
import ErrorCard from '../components/ErrorCard';
import firebase from 'firebase';


const mapStateToProps = state => {
    const petList = Object.keys(state.pet.petList).map(id => {
        return { ...state.pet.petList[id] }
    });
    return {
        auth:state.auth,
        pet: petList
    }
}

class LoginForm extends Component {
  renderPetList = () => {

      return Object.keys(this.props.pet).map((key) => {
          console.log("STAMPA KEY")
          console.log(this.props.pet[key])
          const { currentUser } = firebase.auth();
          console.log('currentUser', currentUser.uid);
          idUser=currentUser.uid
          console.log(idUser)
          if (idUser !== this.props.pet[key]['idUser']){
            console.log("DIVERSO")
            return
          }else{
            console.log("UGUALE")
          }
          const { title, descr,images } = this.props.pet[key]

          return (
              <Card
                  key={key}
                  onPress={() => this.props.navigation.navigate( "Pet",{ pet: this.props.pet[key] })}
              >
                  <CardItem button={true} onPress={() => this.props.navigation.navigate( "Pet",{ pet: this.props.pet[key] })}>
                    <Image
                        source={{ uri: images[images.length-1] }}
                        resizeMode="cover"
                        style={{ height :80, width: 80}}
                    >
                  </Image>
                      <Text>{title}</Text>
                      <Right>
                          <Icon name="arrow-forward" />
                      </Right>
                  </CardItem>
              </Card>
          )
      })
  }
  ren


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

    componentWillMount() {
        console.log("Componente login montato")
        console.log(this.state)

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
          console.log(this.props.pet)
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
