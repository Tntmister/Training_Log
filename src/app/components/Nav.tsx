import { Dimensions, Image, StyleSheet } from "react-native"
import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Search from "./screens/Search"
import HistoryNav from "./screens/History/HistoryNav"
import ProfileNav from "./screens/Profile/ProfileNav"
import Train from "./screens/Train/Train"
import { useTheme } from "../providers/Theme"
import { images } from "../lib/extra"
import HomeNav from "./screens/Home/HomeNav"

const Tab = createMaterialTopTabNavigator()

export default function Nav() {
  const theme = useTheme()

  return (
    <Tab.Navigator
      initialRouteName="Train"
      backBehavior="none"
      tabBarPosition="bottom"
      initialLayout={{ width: Dimensions.get("window").width }}
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: theme.colors.text,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarShowLabel: false,
        tabBarIconStyle: styles.icon,
        tabBarIcon: ({ color }) => (
          <Image
            source={images[route.name as keyof typeof images]}
            style={{
              ...styles.img,
              tintColor: color
            }}
          />
        )
      })}
    >
      <Tab.Screen name="Home" component={HomeNav} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Train" component={Train} />
      <Tab.Screen name="History" component={HistoryNav} />
      <Tab.Screen name="User" component={ProfileNav} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  },
  img: {
    width: "100%",
    height: "100%"
  }
})
