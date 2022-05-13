import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { TrainingModelDoc } from "../Train/Models/ModelList"
import Session from "./Session"
import SessionList from "./SessionList"
import SessionSummary from "./SessionSummary"

export type RootStackParamHistoryNav = {
  SessionList: undefined;
  SessionSummary: { session: TrainingModelDoc };
  Session: { session: TrainingModelDoc };
};

export default function HistoryNav() {
  const Stack = createStackNavigator<RootStackParamHistoryNav>()
  return (
    <Stack.Navigator
      initialRouteName="SessionList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SessionList" component={SessionList} />
      <Stack.Screen name="SessionSummary" component={SessionSummary} />
      <Stack.Screen name="Session" component={Session} />
    </Stack.Navigator>
  )
}
