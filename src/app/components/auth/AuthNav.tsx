import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React, { useContext } from "react"
import { Dimensions, Image, StyleSheet, View } from "react-native"
import { images } from "../../lib/extra"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../providers/Theme"
import SignIn from "./SignIn"
import SignUp from "./SignUp"

export default function AuthNav() {
  const Tab = createMaterialTopTabNavigator()
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
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
          tabBarLabelStyle: { ...theme.text.header },
          tabBarIndicatorStyle: {
            width: barWidth * 0.4,
            left: barWidth * 0.05
          },
          tabBarPressOpacity: 1
        }}
      >
        <Tab.Screen component={SignIn} name={STRS.auth.signIn} />
        <Tab.Screen component={SignUp} name={STRS.auth.signUp} />
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
