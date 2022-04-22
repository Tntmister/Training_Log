import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React from "react"
import ModelList from "./Exercises/ExerciseModelList"
import Exercises from "./Exercises/ExerciseNav"
import { useTheme } from "../../providers/Theme"
import { RFValue } from "react-native-responsive-fontsize"
import { Dimensions } from "react-native"
import { Button } from "../reusable/Button"

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
            fontSize: RFValue(18),
            fontFamily: "Lato"
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text
        }}
      >
        <Tab.Screen component={Exercises} name="Exercises" />
        <Tab.Screen component={ModelList} name="Models" />
      </Tab.Navigator>

      <Button
        style={{
          marginTop: theme.margins.m,
          marginBottom: theme.margins.m
        }}
        onPress={() => console.log("Starting an Empty Training Session")}
      >
        Start an Empty Training Session
      </Button>
    </>
  )
}
