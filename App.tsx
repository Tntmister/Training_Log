import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App = () => {
  return (
    <View>
      <Text style={styles.hello}>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  hello: {
    textAlign: 'center'
  }
});

export default App;
