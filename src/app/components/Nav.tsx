import { StyleSheet, Text, View, Image } from "react-native"
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "./containers/Home"
import Search from "./containers/Search"
import History from "./containers/History"
import User from "./containers/User"
import Train from "./containers/Train"
import { ThemeContext } from "./App"

const Tab = createBottomTabNavigator()

const Nav = () => {
  const theme = React.useContext(ThemeContext)

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.background }
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/icons/home/home(-xxxhdpi).png")}
              resizeMode="contain"
              style={{
                width: focused
                  ? theme.sizes.icon_size_focused
                  : theme.sizes.icon_size,
                height: focused
                  ? theme.sizes.icon_size_focused
                  : theme.sizes.icon_size,
                tintColor: focused ? theme.colors.main : theme.colors.foreground
              }}
            />
          )
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/icons/search/search(-xxxhdpi).png")}
              resizeMode="contain"
              style={{
                width: focused
                  ? theme.sizes.icon_size_focused
                  : theme.sizes.icon_size,
                height: focused
                  ? theme.sizes.icon_size_focused
                  : theme.sizes.icon_size,
                tintColor: focused ? theme.colors.main : theme.colors.foreground
              }}
            />
          )
        }}
      />
      <Tab.Screen
        name="Train"
        component={Train}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/icons/train/train(-xxxhdpi).png")}
              resizeMode="contain"
              style={{
                width: focused
                  ? theme.sizes.icon_size_focused
                  : theme.sizes.icon_size,
                height: focused
                  ? theme.sizes.icon_size_focused
                  : theme.sizes.icon_size,
                tintColor: focused ? theme.colors.main : theme.colors.foreground
              }}
            />
          )
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/icons/history/history(-xxxhdpi).png")}
              resizeMode="contain"
              style={{
                width: focused
                  ? theme.sizes.icon_size_focused
                  : theme.sizes.icon_size,
                height: focused
                  ? theme.sizes.icon_size_focused
                  : theme.sizes.icon_size,
                tintColor: focused ? theme.colors.main : theme.colors.foreground
              }}
            />
          )
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/icons/user/user(-xxxhdpi).png")}
              resizeMode="contain"
              style={{
                width: focused
                  ? theme.sizes.icon_size_focused
                  : theme.sizes.icon_size,
                height: focused
                  ? theme.sizes.icon_size_focused
                  : theme.sizes.icon_size,
                tintColor: focused ? theme.colors.main : theme.colors.foreground
              }}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default Nav
