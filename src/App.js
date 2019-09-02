import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Header} from './components/common';
import firebase from 'firebase'

export default class App extends Component {
  componentWillMount(){
    const firebaseConfig={
      apiKey:'AIzaSyDmW6rdTWFMlBg1LB4w3MSIo8917uYlp0o',
      authDomain:'authentication-e60d4.firebaseapp.com'
    }
    firebase.initializeApp(firebaseConfig)
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
      </View>
    );
  }
}
