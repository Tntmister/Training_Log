import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps
} from "@react-navigation/material-top-tabs"
import React from "react"
import ExerciseNav from "./Exercises/ExerciseNav"
import { useTheme } from "../../../providers/Theme"
import { RFValue } from "react-native-responsive-fontsize"
import { Dimensions } from "react-native"
import ModelNav from "./Models/ModelNav"
import { Button } from "../../reusable/Button"
import { modelModes } from "./Models/Model"

export default function Train({ navigation }: MaterialTopTabBarProps) {
  const Tab = createMaterialTopTabNavigator()

  const theme = useTheme()
  const state = navigation.getState().routes[navigation.getState().index].state
  return (
    <>
      <Tab.Navigator
        backBehavior="none"
        initialLayout={{ width: Dimensions.get("window").width }}
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: RFValue(28),
            fontFamily: "Lato"
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text
        }}
      >
        <Tab.Screen component={ExerciseNav} name="Exercises" />
        <Tab.Screen component={ModelNav} name="Models" />
      </Tab.Navigator>
      {state?.routes[state.index!].state?.index != 1 && (
        <Button
          style={{
            marginTop: theme.margins.s
          }}
          onPress={() => {
            navigation.navigate("Models", {
              screen: "Model",
              params: {
                model: undefined,
                mode: modelModes.Edit
              }
            })
          }}
        >
          Create your own Training Model
        </Button>
      )}
    </>
  )
}
