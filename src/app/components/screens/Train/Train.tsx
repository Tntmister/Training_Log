import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React from "react"
import ExerciseNav from "./Exercises/ExerciseNav"
import { useTheme } from "../../../providers/Theme"
import { RFValue } from "react-native-responsive-fontsize"
import { Dimensions } from "react-native"
import { Button } from "../../reusable/Button"
import ModelNav from "./Models/ModelNav"

export default function Train() {
  const Tab = createMaterialTopTabNavigator()

  const theme = useTheme()

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

      <Button
        style={{
          marginTop: theme.margins.s
        }}
        onPress={() => console.log("New Training Session")}
      >
        Start empty Training Session
      </Button>
    </>
  )
}
