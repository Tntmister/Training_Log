import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { Exercise } from "../../../../../dataDefinition/data"
import ExerciseSelector from "../Exercises/ExerciseSelector"
import { Exercise as ExerciseScreen } from "../Exercises/Exercise"
import EditModel from "./EditModel"
import Model from "./Model"
import ModelList, { TrainingModelDoc } from "./ModelList"

export type RootStackParamListModelNav = {
  ModelList: undefined;
  Model: { model: TrainingModelDoc };
  EditModel: { model?: TrainingModelDoc; isTS: boolean };
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
      <Stack.Screen name="EditModel" component={EditModel} />
      <Stack.Screen name="ExerciseSelector" component={ExerciseSelector} />
      <Stack.Screen name="Exercise" component={ExerciseScreen} />
    </Stack.Navigator>
  )
}
