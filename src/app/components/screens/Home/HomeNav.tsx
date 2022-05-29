import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { Image } from "react-native"
import { images } from "../../../lib/extra"
import { TrainingModel, TrainingSession } from "../../../lib/types/train"
import { useTheme } from "../../../providers/Theme"
import Session from "../History/Session"
import Profile from "../Profile/Profile"
import Model, { modelModes } from "../Train/Models/Model"
import Posts from "./Posts"

export type RootStackParamHomeNav = {
  Posts: { uid: string } | undefined;
  Session: TrainingSession;
  Model: { model: TrainingModel; mode: modelModes };
  Profile: { uid: string } | undefined;
};

export default function HomeNav() {
  const Stack = createStackNavigator<RootStackParamHomeNav>()
  const theme = useTheme()
  const logo = (
    <Image
      source={images.Logo}
      style={{ height: theme.icons.m, aspectRatio: 1 }}
    />
  )
  return (
    <Stack.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerTitle: () => logo,
        headerTitleAlign: "center"
      }}
    >
      <Stack.Screen
        name="Posts"
        component={Posts}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="Session" component={Session} />
      <Stack.Screen name="Model" component={Model} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  )
}
