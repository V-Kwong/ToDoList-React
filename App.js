import React, { Component } from 'react';
import { StyleSheet, Text, View, 
  TouchableOpacity, TextInput, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: 'whitesmoke',
  },
  header: {
    backgroundColor: 'skyblue',
    padding: 15,
  },
  title: {
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: 50,
    padding: 15,
  },
  box: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
  inner: {
    flex: 1,
    margin: 2,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  listContainer: {
    flex: 1,
  },
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'whitesmoke',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remove: {
    marginLeft: 10,
    marginBottom: 2,
    color: '#CD5C5C',
    fontSize: 26,
  },
  completed: {
    backgroundColor: 'whitesmoke',
  },
  footer: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  remove: {
    color: '#CD5C5C',
  },
});

export default class App extends React.Component {

  addItem = (item) => {
    //const {dispatch} = this.props
    //dispatch(actionCreators.addItem(item))
  }

  removeCompleted = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <Title> Todo List </Title>
        <Input
          placeholder={'Enter an item!'}
          onSubmit={this.addItem}
        />
        <View style={styles.divider}/>
        <Text>Changes you make will automatically reload.</Text>
        <View style={styles.divider}/>
        <Footer onRemoveCompleted={this.removeCompleted} />
      </View>
    );
  }
}

class Title extends Component {
  render() {
    const {children} = this.props

    return (
      <View style={styles.header}>
        <Text style={styles.title}>{children}</Text>
      </View>
    )
  }
}

class Input extends Component {

  state = {
    text: '',
  }

  onChangeText = (text) => {
    this.setState({text})
  }

  onSubmitEditing = () => {
    const {onSubmit} = this.props
    const {text} = this.state

    if(!text) return

    onSubmit(text)
    this.setState({text: ''})
  }

  render() {
    const {onSubmit, placeholder} = this.props
    const {text} = this.state

    return (
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={text}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmitEditing}
        blurOnSubmit={false}
      />
    )
  }
}

class Checkbox extends Component {
  render() {
    const {onToggle, isChecked} = this.props

    return (
      <TouchableOpacity onPress={onToggle}>
        <View style={styles.box}>
          { isChecked && <View style={styles.inner}/> }
        </View>
      </TouchableOpacity>
    )
  }
}

class List extends Component {

  renderItem = (item, i) => {
    
  }
}

class Footer extends Component {
  render() {
    const {onRemoveCompleted} = this.props

    return (
      <TouchableOpacity style={styles.footer} onPress={onRemoveCompleted}>
        <Text style={styles.remove}>Remove completed items</Text>
      </TouchableOpacity>
    )
  }
}
