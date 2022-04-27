import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { TrainingModelType } from "../../../../../dataDefinition/data"
import ExerciseSelector from "../Exercises/ExerciseSelector"
import CreateModel from "./CreateModel"
import Model from "./Model"
import ModelList from "./ModelList"

export type RootStackParamList = {
  ModelList: undefined;
  Model: { model: TrainingModelType };
  CreateModel: undefined;
  ExerciseSelector: undefined;
};

export default function ExerciseNav() {
  const Stack = createStackNavigator<RootStackParamList>()

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
