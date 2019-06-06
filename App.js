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
import { Text, View, Alert } from 'react-native';
import TodoList from './src/components/todos.component';
import { NotifService } from './src/push-notifications/pushnotifications';
import openSocket from './src/websocket/webscocket';
import EStyleSheet from 'react-native-extended-stylesheet';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.notif = null;
        this.state = {
            senderId: ""
        };
        NotifService.configure(this.onRegister.bind(this), this.onNotif.bind(this));
        openSocket();
    }
    render() {
        return (React.createElement(View, { style: { flex: 1, alignItems: 'center' } },
            React.createElement(View, { style: styles.header },
                React.createElement(Text, { style: styles.headertext }, "Todo's")),
            React.createElement(View, { style: styles.container },
                React.createElement(TodoList, null)),
            React.createElement(View, { style: { height: 50 } },
                React.createElement(Text, null, "By Anji Kinnara"))));
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
EStyleSheet.build({
    $textColor: '#0275d8'
});
