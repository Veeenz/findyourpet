import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import LoginForm from './src/screens/LoginForm'
import HomeScreen from './src/screens/HomeScreen';
import CreateFind from './src/screens/CreateFind'
import { StackNavigator,TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './src/store';

const config = {
    apiKey: "AIzaSyBqZ0L1pU_CJaGUeCqvqT5DMEtsdnnsVU0",
    authDomain: "findyourbuddy-76527.firebaseapp.com",
    databaseURL: "https://findyourbuddy-76527.firebaseio.com",
    projectId: "findyourbuddy-76527",
    storageBucket: "findyourbuddy-76527.appspot.com",
    messagingSenderId: "1045266650568"
  };
const firebaseApp = firebase.initializeApp(config);

const AppNavigator = TabNavigator({
    Login: { screen: LoginForm },
    Main: { screen: HomeScreen },
    Create: {screen: CreateFind}},
    {
      tabBarOptions: {
        activeTintColor: '#e91e63',
        animationEnabled: 'true',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'blue',
      },
      }
    }
);
class Main extends React.Component {
  state = {
    isReady: false
  }

  async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({isReady: true})
  }



  render(){
    if(!this.state.isReady)
      return null;

    return (
      <Provider store={store}>
        <AppNavigator />
    </Provider>


    );
  }
}


const MyApp = TabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Notifications: {
    screen: CreateFind,
  },
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
    animationEnabled: 'true',
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: 'blue',
  },
  },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(Main);
