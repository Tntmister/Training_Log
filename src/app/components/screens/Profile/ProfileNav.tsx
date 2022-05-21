import React, { useContext } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Profile from "./Profile"
import EditProfile from "./EditProfile"
import { User } from "../../../lib/types/user"
import { UserContext } from "../../../providers/User"

export type RootStackParamUserNav = {
  Profile: { uid: string };
  EditProfile: { user: User };
};

export default function ProfileNav() {
  const user = useContext(UserContext)!
  const Stack = createStackNavigator<RootStackParamUserNav>()

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
