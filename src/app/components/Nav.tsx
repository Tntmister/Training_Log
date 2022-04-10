import { StyleSheet, Text, View, Image } from "react-native"
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "./containers/Home"
import Search from "./containers/Search"
import History from "./containers/History"
import User from "./containers/User"
import Train from "./containers/Train"

const Tab = createBottomTabNavigator()

const Nav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { backgroundColor: "#2F2C3B" }
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/icons1/home/home_pressed(-hdpi).png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FE6751" : "#E9E9E9"
                }}
              />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/icons1/search/search_pressed(-hdpi).png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FE6751" : "#E9E9E9"
                }}
              />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Train"
        component={Train}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/icons1/train/dumbbell_pressed(-hdpi).png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FE6751" : "#E9E9E9"
                }}
              />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/icons1/history/clock_pressed(-hdpi).png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FE6751" : "#E9E9E9"
                }}
              />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/icons1/user/user_pressed(-hdpi).png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FE6751" : "#E9E9E9"
                }}
              />
            </View>
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
