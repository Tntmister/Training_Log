import React from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import {
  createStackNavigator,
  StackScreenProps
} from "@react-navigation/stack"

type RootStackParamList = {
  Test1: undefined;
  Test2: undefined;
};

const Stack = createStackNavigator<RootStackParamList>()

type Props = StackScreenProps<RootStackParamList, "Test1">;

function Test1({ navigation }: Props) {
  return (
    <View>
      <Button title="Test1" onPress={() => navigation.navigate("Test1")} />
      <Button title="Test2" onPress={() => navigation.navigate("Test2")} />
      <Text>Test screen 1</Text>
    </View>
  )
}

function Test2({ navigation }: Props) {
  return (
    <View>
      <Button title="Test1" onPress={() => navigation.navigate("Test1")} />
      <Button title="Test2" onPress={() => navigation.navigate("Test2")} />
      <Text>Test screen 2</Text>
    </View>
  )
}

function Main() {
  return (
    <Stack.Navigator initialRouteName="Test1">
      <Stack.Screen name="Test1" component={Test1} />
      <Stack.Screen name="Test2" component={Test2} />
    </Stack.Navigator>
  )
}

export default Main
