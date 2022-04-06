import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <View>
        <Text style={styles.hello}>Hello World</Text>
      </View>
    </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
  hello: {
    textAlign: 'center'
  }
});

export default App;
