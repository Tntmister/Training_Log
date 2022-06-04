import React, { useContext } from "react"
import { Exercise } from "../../../../../lib/types/train"
import ExerciseInfo from "./ExerciseInfo"
import ExerciseStats from "./ExerciseStats"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Dimensions } from "react-native"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../../../providers/Theme"

export type ExDetailStackParamList = {
  ExerciseInfo: { exercise: Exercise };
  ExerciseStats: { exercise: Exercise };
};

export default function ExerciseDetailNav({
  exercise
}: {
  exercise: Exercise;
}) {
  const Tab = createMaterialTopTabNavigator()
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
  return (
    <Tab.Navigator
      backBehavior="none"
      initialLayout={{ width: Dimensions.get("window").width }}
      screenOptions={{
        tabBarLabelStyle: { ...theme.text.body_m },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text
      }}
      initialRouteName={"ExerciseInfo"}
    >
      <Tab.Screen
        component={ExerciseInfo}
        name={STRS.info}
        initialParams={{ exercise: exercise }}
      />
      <Tab.Screen
        component={ExerciseStats}
        name={STRS.stats}
        initialParams={{ exercise: exercise }}
      />
    </Tab.Navigator>
  )
}
