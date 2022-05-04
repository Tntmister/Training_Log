import { StackNavigationProp } from "@react-navigation/stack"
import React, { useState } from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { Theme } from "../../../../providers/Theme"
import { RootStackParamListModelNav } from "./ModelNav"
import { TrainingModelDoc } from "./ModelList"
import { Text } from "../../../reusable/Text"
import { RFValue } from "react-native-responsive-fontsize"
import { IconButton, Menu } from "react-native-paper"

function ModelDescriptor({
  model,
  navigation,
  theme
}: {
  model: TrainingModelDoc;
  navigation: StackNavigationProp<RootStackParamListModelNav, "ModelList">;
  theme: Theme;
}) {
  const [menuVisible, setMenuVisible] = useState(false)
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Model", { model })}
      style={{
        backgroundColor: theme.colors.backdrop,
        marginBottom: theme.margins.s,
        alignSelf: "center",
        paddingLeft: theme.paddings.l,
        paddingBottom: theme.paddings.l,
        width: "95%",
        borderRadius: 10,
        elevation: 6
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <Text style={{ flexGrow: 1, fontSize: RFValue(18) }}>
          {model.model.name}
        </Text>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <IconButton
              onPress={() => setMenuVisible(true)}
              icon={"dots-vertical"}
            />
          }
        >
          <Menu.Item
            title="Edit"
            onPress={() => {
              navigation.navigate("EditModel", {
                model: { ...model },
                isTS: false
              }),
              setMenuVisible(false)
            }}
          />
        </Menu>
      </View>
      <View>
        <>
          {model.model.exercises.map((ex, key) => (
            <Text style={{ fontSize: RFValue(14) }} key={key}>
              {ex.sets.length} x {ex.name}
            </Text>
          ))}
        </>
        <Image
          style={{
            borderRadius: 10,
            width: 80,
            height: 80,
            marginLeft: "auto",
            marginRight: theme.margins.m
          }}
          source={{ uri: model.model.mediaContent[0]?.uri }}
        />
      </View>
    </TouchableOpacity>
  )
}
export default React.memo(ModelDescriptor)
