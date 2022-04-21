import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React from "react"
import { Dimensions, Image, View } from "react-native"
import { useTheme } from "react-native-paper"
import SignIn from "./SignIn"
import SignUp from "./SignUp"

export default function AuthNav() {
  const Tab = createMaterialTopTabNavigator()
  const theme = useTheme()
  const barWidth = Dimensions.get("window").width * 0.8
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Image
        style={{
          width: "100%",
          height: "30%",
          marginTop: 20
        }}
        resizeMode="contain"
        source={require("../../assets/logo/logo1.png")}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            marginHorizontal: "10%",
            elevation: 0
          },
          tabBarLabelStyle: {
            fontSize: 30
          },
          tabBarIndicatorStyle: {
            width: barWidth * 0.4,
            left: barWidth * 0.05
          },
          tabBarPressOpacity: 1
        }}
      >
        <Tab.Screen component={SignIn} name="Sign In" />
        <Tab.Screen component={SignUp} name="Sign Up" />
      </Tab.Navigator>
    </View>
  )
}
