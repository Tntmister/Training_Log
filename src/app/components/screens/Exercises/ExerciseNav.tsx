import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import Exercise from "./Exercise"
import ExerciseList from "./ExerciseList"

export default function Exercises() {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExerciseList"
        component={ExerciseList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Exercise"
        component={Exercise}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
