import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React from "react"
import { StatusBar, StyleSheet, View } from "react-native"
import Exercise from "../reusable/Exercise"
import ExerciseList from "../reusable/ExerciseList"
import Header from "../reusable/Header"
import ModelList from "../reusable/ModelList"
import { ThemeContext } from "./../App"
import Exercises from "./Exercises"

const Train = () => {
  const Tab = createMaterialTopTabNavigator()

  const theme = React.useContext(ThemeContext)

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <StatusBar backgroundColor={theme.colors.background} />
      <View>
        <Header title="Training" />
        <View style={styles.tabHolder}></View>
      </View>
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            color: theme.colors.main
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.main
          },
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: theme.colors.main,
          tabBarInactiveTintColor: theme.colors.foregroundEnd
        })}
      >
        <Tab.Screen component={ModelList} name="Models" />
        <Tab.Screen component={Exercises} name="Exercises" />
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  indicator: {
    color: "white"
  },
  startTraining: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
    //backgroundColor: "white",
    marginTop: "auto"
  },
  container: {
    flex: 1
  },
  text: {
    fontWeight: "bold"
  },
  title: {
    fontWeight: "bold"
  },
  startButton: {
    flexDirection: "row",
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: "center",

    paddingVertical: 0
    //backgroundColor: "black",
  },
  tab: {
    marginVertical: 10,
    padding: 5
  },
  selectedTab: {
    marginVertical: 10,
    padding: 5
  },
  tabHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
    //backgroundColor: "white"
  },
  underline: {
    height: 3,
    borderRadius: 3,
    width: 90
  }
})

export default Train
