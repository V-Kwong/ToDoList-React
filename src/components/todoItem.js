import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/todoItemStyles';

const TodoItem = ({
  item, index, onPressRemove, markAsDone
}) =>
  (
    <View style={styles.container} >
      <TouchableHighlight
        onPress={() => markAsDone(index)}
        underlayColor="white"
      >
        { item.done ?
        <Icon name="check-square-o" size={30} color="#5fb660" /> :
        <Icon name="square-o" size={30} color="#808080" />
      }
      </TouchableHighlight>
      <Text style={[
            styles.text, {
              textDecorationLine: item.done ? 'line-through' : 'none',
              color: item.done ? '#808080' : 'black'
          }]}
      >{item.title}
      </Text>
      <TouchableHighlight
        onPress={() => onPressRemove(index)}
      >
        <Icon name="remove" size={30} color="#d75452" />
      </TouchableHighlight>
    </View>
  );

export default TodoItem;