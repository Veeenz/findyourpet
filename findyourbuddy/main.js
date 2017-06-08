import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

class App extends React.Component {

  componentWillMount(){
    const config = {
        apiKey: "AIzaSyBqZ0L1pU_CJaGUeCqvqT5DMEtsdnnsVU0",
        authDomain: "findyourbuddy-76527.firebaseapp.com",
        databaseURL: "https://findyourbuddy-76527.firebaseio.com",
        projectId: "findyourbuddy-76527",
        storageBucket: "findyourbuddy-76527.appspot.com",
        messagingSenderId: "1045266650568"
      };
    const firebaseApp = firebase.initializeApp(config);

  }
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
          <App />
      </ThemeProvider>
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

Expo.registerRootComponent(App);
