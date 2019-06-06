/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import TodoList from './src/components/todos.component';
import { NotifService } from './src/push-notifications/pushnotifications';
import openSocket from './src/websocket/webscocket';
import EStyleSheet from 'react-native-extended-stylesheet';


interface Props { }
export default class App extends Component<Props> {
  notif: any = null;
  constructor(props) {
    super(props);
    this.state = {
      senderId: ""
    };
    NotifService.configure(this.onRegister.bind(this), this.onNotif.bind(this));
    openSocket();
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.header}>
          <Text style={styles.headertext}>Todo's</Text>
        </View>
        <View style={styles.container}>
          <TodoList />
        </View>
        <View style={{ height: 50 }}>
          <Text>By Anji Kinnara</Text>
        </View>
      </View>
    );
  }

  onRegister(token) {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif(notif) {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert("Permissions", JSON.stringify(perms));
  }
}

const styles = EStyleSheet.create({
  header: {
    width: '100%',
    marginTop: 50,
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'grey'
  },
  headertext: {
    fontSize: '2rem',
    color: 'white',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    marginBottom: 10,
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  button: {
    borderWidth: 1,
    borderColor: "#000000",
    margin: 5,
    padding: 5,
    width: "70%",
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
  },
});

EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!
  $textColor: '#0275d8'
});