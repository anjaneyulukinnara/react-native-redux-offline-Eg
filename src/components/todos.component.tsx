
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, RefreshControl } from 'react-native';
import { addTodo, removeTodo } from '../reducers/todo.actions';
import { Store } from '../reducers/store';
import Icon from '../customicons/custom-icons';


export default class TodoList extends Component<any, any> {
    state = {
        todos: [],
        todo: '',
        refreshing: true
    };
    todoInput: any = null;
    todosUnsubscribe: any;
    componentDidMount() {
        this.todosUnsubscribe = Store.subscribe(() => {
            this.setState({
                todos: Store.getState().todos.filter(item => !item.isDeleted),
                refreshing: false
            })
        })
        Store.dispatch({ type: 'FETCH_TODOS' })
    }
    _onRefresh = () => {
        this.setState({
            refreshing: true,
        })
        Store.dispatch({ type: 'FETCH_TODOS' })
    }
    render() {
        return (

            <View style={{ flex: 1 }}>
                <View style={{ height: 100, flexDirection: 'row' }}>
                    <TextInput
                        placeholder={'add a todo'}
                        style={{ height: 50, fontSize: 18, minWidth: 200, borderColor: 'gray', borderBottomWidth: 1 }}
                        onChangeText={(todo) => this.setState({ todo })}
                        onSubmitEditing={this.addTodo.bind(this)}
                        returnKeyLabel="Add"
                        returnKeyType="done"
                        value={this.state.todo}
                    />
                </View>
                <ScrollView style={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    {this.state.todos.map(this.renderItem.bind(this))}
                </ScrollView>
            </View>

        )
    }

    addTodo() {
        Store.dispatch(addTodo(this.state.todo))
        this.setState({ todo: '' })
    }

    renderItem(item, index) {
        return (
            <View key={item.id} style={{ height: 50, flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center', alignContent: 'center' }}>
                <Text style={{ padding: 10, fontSize: 18, justifyContent: 'flex-start' }}>
                    {item.content}
                </Text>
                <TouchableOpacity onPress={() => this.removeItem(item.id)} style={{ paddingVertical: 10, justifyContent: 'flex-start' }}>
                    <Icon name="cross" size={18} color="#900" />
                </TouchableOpacity>
            </View>
        )
    }

    removeItem = (id) => {
        Store.dispatch(removeTodo(id))
    }

    componentWillUnmount() {
        this.todosUnsubscribe();
    }
}