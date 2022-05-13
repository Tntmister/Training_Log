import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { Text } from "../../reusable/Text"
import { TrainingModelDoc } from "../Train/Models/ModelList"
import { RootStackParamHistoryNav } from "./HistoryNav"

export default function Session({
  navigation,
  session
}: {
  navigation: StackNavigationProp<RootStackParamHistoryNav, "Session">;
  session: TrainingModelDoc;
}) {
  return <Text>Session</Text>
}
