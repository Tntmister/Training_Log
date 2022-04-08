import React from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()

const Test1 = ({ navigation }) => {
  return (
    <View>
      <Button title="Test1" onPress={() => navigation.navigate("Test1")} />
      <Button title="Test2" onPress={() => navigation.navigate("Test2")} />
      <Text>Test screen 1</Text>
    </View>
  )
}

const Test2 = ({ navigation }) => {
  return (
    <View>
      <Button title="Test1" onPress={() => navigation.navigate("Test1")} />
      <Button title="Test2" onPress={() => navigation.navigate("Test2")} />
      <Text>Test screen 2</Text>
    </View>
  )
}

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Test1" component={Test1} />
        <Stack.Screen name="Test2" component={Test2} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main
