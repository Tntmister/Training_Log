import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Exercise from "../reusable/Exercise"
import ExerciseList from "../reusable/ExerciseList"

export default function Exercises() {
  const Stack = createNativeStackNavigator()
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
