import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { Exercise as ExerciseType } from "../../../../dataDefinition/data"
import Exercise from "./Exercise"
import ExerciseList from "./ExerciseList"

export type RootStackParamList = {
  ExerciseList: undefined;
  Exercise: { exercise: ExerciseType };
};

export default function ExerciseNav() {
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
