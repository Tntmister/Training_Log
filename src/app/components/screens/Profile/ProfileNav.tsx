import React, { useContext } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Profile from "./Profile"
import FollowUsers from "./FollowUsers"
import EditProfile from "./EditProfile"
import { Post as PostType, User } from "../../../lib/types/user"
import { UserContext } from "../../../providers/User"
import Model, { modelModes } from "../Train/Models/Model"
import { TrainingSession, TrainingModel } from "../../../lib/types/train"
import Post from "../Home/Post"
import ReportedPosts from "./ReportedPosts"

export type RootStackParamUserNav = {
  Profile: { uid: string };
  ProfileFromSearch: { uid: string };
  EditProfile: { user: User };
  SessionSummary: { session: TrainingSession };
  Model: { model: TrainingModel; mode: modelModes };
  FollowUsers: { uid: string; type: "followers" | "following" };
  ReportedPosts: undefined;
  Post: { post: PostType; postId: string };
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
      <Stack.Screen name="Model" component={Model} />
      <Stack.Screen name="FollowUsers" component={FollowUsers} />
      <Stack.Screen name="ReportedPosts" component={ReportedPosts} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="ProfileFromSearch" component={Profile} />
    </Stack.Navigator>
  )
}
