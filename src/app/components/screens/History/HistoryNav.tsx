import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { TrainingSession } from "../../../lib/types/train"
import Session from "./Session"
import SessionList from "./SessionList"

export type RootStackParamHistoryNav = {
  SessionList: undefined;
  Session: TrainingSession;
};

export default function HistoryNav() {
  const Stack = createStackNavigator<RootStackParamHistoryNav>()
  return (
    <Stack.Navigator
      initialRouteName="SessionList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SessionList" component={SessionList} />
      <Stack.Screen name="Session" component={Session} />
    </Stack.Navigator>
  )
}
