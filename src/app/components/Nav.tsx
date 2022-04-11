import { StyleSheet, Text, View, Image } from "react-native"
import React from "react"
import Home from "./containers/Home"
import Search from "./containers/Search"
import History from "./containers/History"
import User from "./containers/User"
import Train from "./containers/Train"
import Auth from "./Auth"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

const Tab = createMaterialTopTabNavigator()

const Nav = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: styles.nav
      })}
    >
      <Tab.Screen
        name="Auth"
        component={Auth}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/icons/icons1/home/home_pressed(-hdpi).png")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#FE6751" : "#E9E9E9"
              }}
            />
          )
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/icons/icons1/home/home_pressed(-hdpi).png")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#FE6751" : "#E9E9E9"
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
              source={require("../assets/icons/icons1/search/search_pressed(-hdpi).png")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#FE6751" : "#E9E9E9"
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
              source={require("../assets/icons/icons1/train/dumbbell_pressed(-hdpi).png")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#FE6751" : "#E9E9E9"
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
              source={require("../assets/icons/icons1/history/clock_pressed(-hdpi).png")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#FE6751" : "#E9E9E9"
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
              source={require("../assets/icons/icons1/user/user_pressed(-hdpi).png")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#FE6751" : "#E9E9E9"
              }}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: "#2F2C3B"
  }
})

export default Nav
