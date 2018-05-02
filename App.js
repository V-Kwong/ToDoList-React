import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Todo from './src/components/todo';

const App = () =>
  (
    <View style={styles.container}>
      <Text style={styles.welcome}>
          React Native Todo App
      </Text>
      <Todo/>
    </View>
  );
  
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
export default App;