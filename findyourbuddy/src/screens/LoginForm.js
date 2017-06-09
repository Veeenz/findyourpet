import { StackNavigator } from "react-navigation";
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { loginUser } from '../actions/actions';
const mapStateToProps = state => ({
  auth: state.auth
})

const LoginForm = props => (
    <View style={{top:40}}>
    <Text>Hello world</Text>
    <Button light onPress={() => props.loginUser()}><Text> Light </Text></Button>
    </View>
);

const style = StyleSheet.create({
  loginForm:{
    flex: 1,
    flexDirection: 'column',
  }
})

export default connect(mapStateToProps, { loginUser })(LoginForm);
