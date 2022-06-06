import React, { useContext } from "react"
import { Exercise as ExerciseType } from "../../../../../lib/types/train"
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

import type { StackScreenProps } from "@react-navigation/stack"
import { Appbar } from "react-native-paper"
import { RootStackParamList } from "../ExerciseNav"

export type ExDetailStackParamList = {
  ExerciseInfo: { exercise: ExerciseType };
  ExerciseStats: { exercise: ExerciseType };
};

export function Exercise({
  route,
  navigation
}: StackScreenProps<RootStackParamList, "Exercise">) {
  const { exercise } = route.params
  const Tab = createMaterialTopTabNavigator()
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack}></Appbar.BackAction>
        <Appbar.Content title={exercise.name} />
      </Appbar>
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
    </>
  )
}
