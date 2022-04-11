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

const Nav = (props: { style: any }) => {
  const [style, setStyle] = React.useState(props.style)
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { backgroundColor: style.background[1] }
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
            <View>
              <Image
                source={require("../assets/icons/home/home(-xxxhdpi).png")}
                resizeMode="contain"
                style={{
                  width: focused ? style.icon_size_focused : style.icon_size,
                  height: focused ? style.icon_size_focused : style.icon_size,
                  tintColor: focused ? style.main[1] : style.text[1]
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
                source={require("../assets/icons/search/search(-xxxhdpi).png")}
                resizeMode="contain"
                style={{
                  width: focused ? style.icon_size_focused : style.icon_size,
                  height: focused ? style.icon_size_focused : style.icon_size,
                  tintColor: focused ? style.main[1] : style.text[1]
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
                source={require("../assets/icons/train/train(-xxxhdpi).png")}
                resizeMode="contain"
                style={{
                  width: focused ? style.icon_size_focused : style.icon_size,
                  height: focused ? style.icon_size_focused : style.icon_size,
                  tintColor: focused ? style.main[1] : style.text[1]
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
                source={require("../assets/icons/history/history(-xxxhdpi).png")}
                resizeMode="contain"
                style={{
                  width: focused ? style.icon_size_focused : style.icon_size,
                  height: focused ? style.icon_size_focused : style.icon_size,
                  tintColor: focused ? style.main[1] : style.text[1]
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
                source={require("../assets/icons/user/user(-xxxhdpi).png")}
                resizeMode="contain"
                style={{
                  width: focused ? style.icon_size_focused : style.icon_size,
                  height: focused ? style.icon_size_focused : style.icon_size,
                  tintColor: focused ? style.main[1] : style.text[1]
                }}
              />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})

export default Nav
