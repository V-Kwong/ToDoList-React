import React, { Component } from 'react';
import { AsyncStorage, TextInput, View, FlatList } from 'react-native';
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

  componentDidMount = async () => {
    try {
      const jsonToDo = await AsyncStorage.getItem('todo');
      if (jsonToDo !== null) {
        this.setState({ 'todos': JSON.parse(jsonToDo) });
      }
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit = async () => {
    if (this.state.text) {
      const newToDo = [...this.state.todos,
        { title: this.state.text, done: false }];
      
      this.setState({
        text: '',
        todos: newToDo
      })

      // this.setState(prevState => ({
      //   text: '',
      //   todos: [...prevState.todos,
      //     { title: prevState.text, done: false }]
      // }));
      this.textInput.setNativeProps({ text: '' });

      // const newToDo = [...this.state.todos,
      //   { title: this.state.text, done: false }];
      // console.log(newToDo);
      // var jsonString = JSON.stringify(newToDo);
      // console.log(jsonString);
      // console.log(JSON.parse(jsonString));

      try {
        await AsyncStorage.setItem('todo', JSON.stringify(newToDo));
      } catch (error) {
        console.log(error);
      }
    }
  }

  // setName = async () => {
  //   try {
  //     const newName = this.state.value;
  //     await AsyncStorage.setItem('name', newName);
  //     this.setState({ 'saved': newName });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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