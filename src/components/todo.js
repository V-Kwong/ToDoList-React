import React, { Component } from 'react';
import { TextInput, View, FlatList } from 'react-native';
import TodoItem from '../components/todoItem'
import styles from '../styles/todoStyles';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      todos: []
    };
  }

  onSubmit = () => {
    if (this.state.text) {
      this.setState(prevState => ({
        text: '',
        todos: [...prevState.todos,
          { title: prevState.text, done: false }]
      }));
      this.textInput.setNativeProps({ text: '' });
    }
  }

  keyExtractor = (item, index) => index;

  separator = () => <View style={styles.separator} />;

  renderItem = ({ item, index }) => (
    <TodoItem
      item={item}
      index={index}
      markAsDone={this.markAsDone}
      onPressRemove={this.onPressRemove}
    />
  );

  onPressRemove = (index) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter((_, i) => i !== index)
    }));
  }

  markAsDone = (index) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((item, i) => {
        if (i === index) {
          item.done = !item.done;
          return item;
        }
        return item;
      })
    }));
  }

  render () {
      return (
      <View style={styles.container} >
          <TextInput
            selectionColor="black"
            underlineColorAndroid="black"
            placeholder="What needs to be done"
            onChangeText={text => this.setState({ text })}
            onSubmitEditing={this.onSubmit}
            ref={(component) => { this.textInput = component; }}
            autoFocus
          />
          <FlatList
          ItemSeparatorComponent={this.separator}
          data={this.state.todos}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          />
      </View>
      )
  }
}
export default Todo;