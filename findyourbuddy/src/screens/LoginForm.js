import { StackNavigator } from "react-navigation";
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
const LoginForm = props => (
    <View style={{top:40}}>
    <Text>Hello world</Text>
    <Button light><Text> Light </Text></Button>
      
    </View>
);

const style = StyleSheet.create({
  loginForm:{
    flex: 1,
    flexDirection: 'column',
  }
})

export default LoginForm
