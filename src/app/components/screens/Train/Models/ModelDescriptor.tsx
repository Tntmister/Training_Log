import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { TouchableOpacity } from "react-native"
import { Theme } from "../../../../providers/Theme"
import { RootStackParamListModelNav } from "./ModelNav"
import { TrainingModelDoc } from "./ModelList"

function ModelDescriptor({
  model,
  navigation,
  theme
}: {
  model: TrainingModelDoc;
  navigation: StackNavigationProp<RootStackParamListModelNav, "ModelList">;
  theme: Theme;
}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Model", model)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.backdrop,
        marginBottom: theme.margins.s,
        width: "95%",
        paddingVertical: theme.paddings.s,
        paddingHorizontal: theme.paddings.m,
        borderRadius: 10,
        height: 70,
        elevation: 6
      }}
    ></TouchableOpacity>
  )
}
export default React.memo(ModelDescriptor)
