import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React, { useContext } from "react"
import { Dimensions, Image, View } from "react-native"
import { ThemeContext } from "../../App"
import SignIn from "./SignIn"
import SignUp from "./SignUp"

export default function AuthNav() {
  const Tab = createMaterialTopTabNavigator()
  const theme = useContext(ThemeContext)
  const barWidth = Dimensions.get("window").width * 0.8

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Image
        style={{
          width: "100%",
          height: "25%",
          marginTop: 20
        }}
        resizeMode="contain"
        source={require("../../assets/logo/logo1.png")}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            marginHorizontal: "10%",
            elevation: 0
          },
          tabBarLabelStyle: {
            fontSize: 30
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.main,
            width: barWidth * 0.4,
            left: barWidth * 0.05
          },
          tabBarActiveTintColor: theme.colors.white,
          tabBarInactiveTintColor: theme.colors.white,
          tabBarPressOpacity: 1,
          tabBarPressColor: theme.colors.background
        }}
      >
        <Tab.Screen component={SignIn} name="Sign In" />
        <Tab.Screen component={SignUp} name="Sign Up" />
      </Tab.Navigator>
    </View>
  )
}
