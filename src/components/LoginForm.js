import React, {Component} from 'react';
import firebase from 'firebase';
import {Text, View} from 'react-native';
import {Button, Card, CardSection, Input} from './common';

export default class LoginForm extends Component {
  state = {email: '', password: '', error: ''};

  onButtonPress = () => {
    const {email, password} = this.state;
    this.setState({error: ''});
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .catch(() => {
            this.setState({error: 'Authentication2 failed'});
          });
      });
  };
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({email: email})}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder="Password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            secureTextEntry
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        <CardSection>
          <Button onPress={this.onButtonPress}>Login</Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};
