import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps
} from "@react-navigation/material-top-tabs"
import React, { useContext } from "react"
import ExerciseNav from "./Exercises/ExerciseNav"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../providers/Theme"
import { Dimensions } from "react-native"
import ModelNav from "./Models/ModelNav"
import { Button } from "../../reusable/Button"
import { modelModes } from "./Models/Model"

export default function TrainNav({ navigation }: MaterialTopTabBarProps) {
  const Tab = createMaterialTopTabNavigator()

  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
  const modelNavState = navigation.getState().routes[2].state?.routes[1].state
  return (
    <>
      <Tab.Navigator
        backBehavior="none"
        initialLayout={{ width: Dimensions.get("window").width }}
        screenOptions={{
          tabBarLabelStyle: { ...theme.text.body_m },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text
        }}
      >
        <Tab.Screen
          component={ExerciseNav}
          name={STRS.train.exercises.exercises}
          options={{
            tabBarStyle: {
              display:
                navigation.getState().routes[2].state?.routes[0].state?.index ==
                1
                  ? "none"
                  : undefined
            }
          }}
        />
        <Tab.Screen component={ModelNav} name={STRS.train.models.models} />
      </Tab.Navigator>
      {(modelNavState?.routeNames === undefined ||
        modelNavState?.routeNames[modelNavState.index!] == "ModelList") && (
        <Button
          style={{
            marginTop: theme.margins.s
          }}
          onPress={() => {
            navigation.navigate(STRS.train.models.models, {
              screen: "Model",
              params: {
                model: undefined,
                mode: modelModes.Edit
              }
            })
          }}
        >
          {STRS.train.startTraining}
        </Button>
      )}
    </>
  )
}
