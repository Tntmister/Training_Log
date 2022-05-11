import React, { useContext } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Profile from "./Profile"
import EditProfile from "./EditProfile"
import { UserContext } from "../../../providers/User"

export type RootStackParamUserNav = {
  Profile: { uid: string };
  EditProfile: undefined;
};

export default function UserNav() {
  const Stack = createStackNavigator<RootStackParamUserNav>()
  const user = useContext(UserContext)!

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        initialParams={{ uid: user.uid }}
      />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  )
}
