import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import Exercise from "./Exercise"
import ExerciseList from "./ExerciseList"

export type RootStackParamList = {
  ExerciseList: undefined;
  Exercise: { name: string | undefined };
};

export default function Exercises() {
  const Stack = createStackNavigator<RootStackParamList>()

  return (
    <Stack.Navigator
      initialRouteName="ExerciseList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ExerciseList" component={ExerciseList} />
      <Stack.Screen name="Exercise" component={Exercise} />
    </Stack.Navigator>
  )
}
