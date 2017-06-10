import { StackNavigator } from "react-navigation";
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Button, Text, Form, Item, Input, InputGroup, Label} from 'native-base';
import { connect } from 'react-redux';
import { loginUser } from '../actions/actions';
const mapStateToProps = state => ({
  auth: state.auth
})

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
  }
  render(){
    return(

      <Container>

        <Content padder>
        <Item stackedLabel>
            <Label>Email</Label>
            <Input onChangeText={(email) => this.setState({email})} />
        </Item>
        <Item stackedLabel>
            <Label>Password</Label>
            <Input onChangeText={(password) => this.setState({password})}/>
        </Item>
          <Button block primary onPress={() => this.props.loginUser({
            email: this.state.email,
            password: this.state.password,
            navigateTo: (screen) => this.props.navigation.navigate(screen)})
          }>
            <Text>Submit</Text>
          </Button>
          </Content>
        </Container>
    );
  }
};

const style = StyleSheet.create({
  login:{
    width:'80%',
    alignItems: 'center',
    justifyContent: 'center'

  }
})

export default connect(mapStateToProps, { loginUser })(LoginForm);
