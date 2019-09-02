import React, {Component} from 'react';
import firebase from 'firebase';
import {Text, View} from 'react-native';
import {Button, Card, CardSection, Spinner, Input} from './common';

export default class LoginForm extends Component {
  state = {email: '', password: '', error: '', loading: false};

  onButtonPress = () => {
    const {email, password} = this.state;
    this.setState({error: '', loading: true});

    firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then(() => his.onLoginSuccess.bind(this))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email.trim(), password)
          .then(() => this.onLoginSuccess.bind(this))
          .catch(() => this.onLoginFail.bind(this));
      });
  };
  onLoginFail = () => {
    this.setState({error: 'Authentication failed', loading: false});
  };

  onLoginSuccess = () => {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
    });
  };

  renderButton = () => {
    if (this.state.loading) {
      return <Spinner size="small" />;
    } else {
      return <Button onPress={this.onButtonPress}>Login</Button>;
    }
  };
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            keyboardType="email-address"
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
        <CardSection>{this.renderButton()}</CardSection>
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
