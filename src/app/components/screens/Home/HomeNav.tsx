import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import {
  TrainingModel,
  TrainingSession
} from "../../../../dataDefinition/data"
import Posts from "./Posts"

export type RootStackParamHomeNav = {
  Posts: undefined;
  Post: { post: TrainingSession | TrainingModel };
};

export default function HomeNav() {
  const Stack = createStackNavigator<RootStackParamHomeNav>()

  return (
    <Stack.Navigator
      initialRouteName="Posts"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Posts" component={Posts} />
      {/* <Stack.Screen name="Post" component={Post} /> */}
    </Stack.Navigator>
  )
}
