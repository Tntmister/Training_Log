import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { Exercise } from "../../../../../dataDefinition/data"
import ExerciseSelector from "../Exercises/ExerciseSelector"
import CreateModel from "./CreateModel"
import Model from "./Model"
import ModelList, { TrainingModelDoc } from "./ModelList"

export type RootStackParamListModelNav = {
  ModelList: undefined;
  Model: { model: TrainingModelDoc };
  CreateModel: { model?: TrainingModelDoc };
  ExerciseSelector: { onSubmit: (selectedExercises: Exercise[]) => void };
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
      <Stack.Screen name="CreateModel" component={CreateModel} />
      <Stack.Screen name="ExerciseSelector" component={ExerciseSelector} />
    </Stack.Navigator>
  )
}
