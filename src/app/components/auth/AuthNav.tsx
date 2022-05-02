import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React from "react"
import { Dimensions, Image, StyleSheet, View } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { images } from "../../lib/extra"
import { useTheme } from "../../providers/Theme"
import SignIn from "./SignIn"
import SignUp from "./SignUp"

export default function AuthNav() {
  const Tab = createMaterialTopTabNavigator()
  const theme = useTheme()
  const barWidth = Dimensions.get("window").width * 0.8
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Image
        style={{ ...styles.logo, marginTop: theme.margins.m }}
        resizeMode="contain"
        source={images.Logo}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            marginHorizontal: "10%",
            elevation: 0
          },
          tabBarLabelStyle: {
            fontSize: RFValue(28),
            fontFamily: "Lato"
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    width: "100%",
    height: "30%"
  }
})
