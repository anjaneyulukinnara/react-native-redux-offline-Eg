
import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { addTodo } from '../reducers/todo.actions';
interface IPrpops {
    todos: [{
        id: string,
        content: string
    }],
    addTodo(content: string): any,
    setTodos(todos: any): any,
}

class TodoList extends Component<IPrpops, any> {
    state = {
        todo: ''
    };
    todoInput: any = null;
    componentDidMount() {
        fetch('http://localhost:3600/todos').then(res => res.json()).then((todos) => this.props.setTodos(todos))
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 100, flexDirection: 'row' }}>
                    <TextInput
                        placeholder={'add a todo'}
                        style={{ height: 40, width:200, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(todo) => this.setState({ todo })}
                        value={this.state.todo}
                    />
                    <TouchableOpacity>
                        <Button title="Add" onPress={this.addTodo.bind(this)} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    {this.props.todos.map(this.renderItem.bind(this))}
                </View>
            </View>
        )
    }
    addTodo() {
        this.props.addTodo(this.state.todo);
        this.setState({ todo: '' })
    }
    renderItem(item, index) {
        return (
            <View key={item.id} style={{ height: 50, flexDirection: "row" }}>
                <Text style={{ height: 50 }}>
                    {item.content}
                </Text>
                <TouchableOpacity style={{ height: 50 }}>
                    <Button title="Remove" onPress={() => this.removeItem(item.id)} />
                </TouchableOpacity>
            </View>
        )
    }

    removeItem = (id) => {

    }
}

const mapStateToProps = state => ({
    todos: state.todos.filter(item => !item.isDeleting)
});

const mapDispatchToProps = dispatch => ({
    addTodo: content => dispatch(addTodo(content)),
    setTodos: todos => dispatch({ type: 'SET_TODOS', todos }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);