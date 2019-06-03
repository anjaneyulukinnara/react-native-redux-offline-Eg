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
import { Platform, StyleSheet, View } from 'react-native';
import TodoList from './src/components/todos.component';
import { Provider } from 'react-redux';
import { Store } from './src/reducers/store';
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
export default class App extends Component {
    render() {
        return (React.createElement(Provider, { store: Store },
            React.createElement(View, { style: styles.container },
                React.createElement(TodoList, null))));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
});
