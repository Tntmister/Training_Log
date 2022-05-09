import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { Exercise, TrainingModel } from "../../../../../dataDefinition/data"
import ExerciseSelector from "../Exercises/ExerciseSelector"
import { Exercise as ExerciseScreen } from "../Exercises/Exercise"
import Model, { modelModes } from "./Model"
import ModelList, { TrainingModelDoc } from "./ModelList"
import Session from "../Session/Session"

export type RootStackParamListModelNav = {
  ModelList: undefined;
  Session: { model: TrainingModel };
  Model: { model?: TrainingModelDoc; mode: modelModes };
  ExerciseSelector: { onSubmit: (selectedExercises: Exercise[]) => void };
  Exercise: { exercise: Exercise };
};

export default function ExerciseNav() {
  const Stack = createStackNavigator<RootStackParamListModelNav>()

  return (
    <Stack.Navigator
      initialRouteName="ModelList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ModelList" component={ModelList} />
      <Stack.Screen name="Model" component={Model} />
      <Stack.Screen name="ExerciseSelector" component={ExerciseSelector} />
      <Stack.Screen name="Exercise" component={ExerciseScreen} />
      <Stack.Screen name="Session" component={Session} />
    </Stack.Navigator>
  )
}
