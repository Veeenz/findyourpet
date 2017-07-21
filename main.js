import Expo from 'expo';
import { Permissions, Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import LoginForm from './src/screens/LoginForm'
import HomeContainer from './src/containers/HomeContainer';
import CreateFind from './src/screens/CreateFind'
import PetScreen from './src/screens/PetScreen'
import ListScreen from './src/screens/ListScreen'
import Signup from './src/screens/Signup'
import ImageScreen from './src/screens/ImageScreen'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
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

const SecondaryNavigator = StackNavigator({
    Login: { screen: LoginForm },
    Create: { screen: CreateFind},
    Pet: {screen: PetScreen},
    Signup: {screen: Signup}
});

const MainStackNavigator = StackNavigator({
    MainScreen: { screen: HomeContainer },
    Pet: {screen: PetScreen},
    ImageScreen: {screen: ImageScreen}
});


const SecondaryNavigator2 = StackNavigator({
  List: {screen: ListScreen},
  Pet: {screen: PetScreen},
  ImageScreen: {screen: ImageScreen}

})

const MainNavigator = TabNavigator({
    Login: { screen: SecondaryNavigator },
    Main: { screen: MainStackNavigator },
    List: {screen: SecondaryNavigator2}
},
{
    tabBarComponent: NavigationComponent,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        bottomNavigationOptions: {
            labelColor: 'white',
            rippleColor: 'white',
            tabs: {
                Login: {
                    barBackgroundColor: '#37474F',
                },
                Main: {
                    barBackgroundColor: '#37474F',
                },
                Create: {
                    barBackgroundColor: '#EEEEEE',
                    activeLabelColor: '#212121',
                }
            }
        }
    }
});


class Main extends React.Component {
  state = {
    isReady: false,
    notification: {},
  }

  async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        'Ionicons': require('native-base/Fonts/Ionicons.ttf')
      });
      this.setState({isReady: true})
      this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }
  _handleNotification = (notification) => {

  this.setState({notification: notification});
    alert(this.state.notification)
};


  render(){
    if(!this.state.isReady)
      return null;

    return (
        <Provider store={store} style={{top:20}}>
            <MainNavigator />
        </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(Main);
