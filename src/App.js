import React, {Component} from 'react';
import {Text, View} from 'react-native';
import firebase from 'firebase';
import {Header} from './components/common';
import LoginForm from './components/LoginForm';

export default class App extends Component {
  UNSAFE_componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDmW6rdTWFMlBg1LB4w3MSIo8917uYlp0o',
      authDomain: 'authentication-e60d4.web.com',
    };
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        <LoginForm />
      </View>
    );
  }
}
