import { Dimensions, Image, ImageURISource } from "react-native"
import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Home from "./screens/Home"
import Search from "./screens/Search"
import History from "./screens/History"
import User from "./screens/User"
import Train from "./screens/Train"
import { useTheme } from "../providers/Theme"

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
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background
        },
        tabBarIconStyle: {
          width: 30,
          height: 30
          //borderWidth: 2,
          //borderColor: "#ffffff"
        },
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            image={images[route.name as keyof typeof images]}
          />
        )
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Train" component={Train} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  )
}
const images = {
  User: require("../assets/icons/user/user(-xxxhdpi).png"),
  History: require("../assets/icons/history/history(-xxxhdpi).png"),
  Home: require("../assets/icons/home/home(-xxxhdpi).png"),
  Search: require("../assets/icons/search/search(-xxxhdpi).png"),
  Train: require("../assets/icons/train/train(-xxxhdpi).png")
}

function TabBarIcon({
  focused,
  image
}: {
  focused: boolean;
  image: ImageURISource;
}) {
  const theme = useTheme()
  return (
    <Image
      source={image}
      resizeMode="contain"
      style={{
        width: "100%", //focused ? 30 : 25,
        height: "100%", //focused ? 30 : 25,
        tintColor: focused ? theme.colors.primary : theme.colors.text
      }}
    />
  )
}
