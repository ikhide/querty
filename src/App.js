import React, {Component} from 'react';
import {Text, View} from 'react-native';
import firebaseConfig from './config/firebase';
import firebase from 'firebase';
import {Header, Button, Spinner} from './components/common';
import LoginForm from './components/LoginForm';

export default class App extends Component {
  state = {
    loggedIn: null,
  };
  UNSAFE_componentWillMount() {
    try {
      firebase.initializeApp(firebaseConfig);
    } catch (err) {
      // we skip the "already exists" message which is
      // not an actual error when we're hot-reloading
      if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack);
      }
    }
    // Initialize Firebase

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent = () => {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
        );
      case false:
        return <LoginForm />;
      case null:
        return (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Spinner />
          </View>
        );
    }

    return <LoginForm />;
  };

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}
