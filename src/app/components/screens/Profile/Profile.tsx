/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, useEffect, useState } from "react"
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native"
import InlineView from "../../reusable/InlineView"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../providers/Theme"
import { images } from "../../../lib/extra"
import UserStat from "./reusable/userStat"
import { Text } from "../../reusable/Text"
import { UserContext } from "../../../providers/User"
import { Button } from "../../reusable/Button"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamUserNav } from "./ProfileNav"
import {
  followUser,
  subscribeFollowing,
  subscribeUser,
  unfollowUser
} from "../../../lib/firebase/user"
import { Follow, User } from "../../../lib/types/user"
import { CachedImage } from "@georstat/react-native-image-cache"
import { IconButton, Menu } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import { logout } from "../../../lib/firebase/auth"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Posts from "../Home/Posts"
import UserStats from "./UserStats"

export type RootStackProfileList = {
  Posts: { uid: string } | undefined;
  Stats: { uid: string } | undefined;
};

export default function Profile({
  navigation,
  route
}: StackScreenProps<RootStackParamUserNav, "Profile">) {
  const theme = useTheme()

  const Tab = createMaterialTopTabNavigator()

  const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    username: {
      textAlignVertical: "center",
      paddingLeft: theme.paddings.l
    },
    headerContainer: {
      width: "90%",
      alignSelf: "center",
      justifyContent: "space-between"
    },
    img: {
      height: 90,
      width: undefined,
      aspectRatio: 1,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      borderRadius: 10,
      overflow: "hidden"
    },
    statsContainer: {
      justifyContent: "space-evenly",
      flexGrow: 1
    },
    infoContainer: {
      paddingTop: theme.margins.m
    },
    info: {
      width: "50%",
      marginLeft: theme.margins.m
    },
    description: {
      width: "90%",
      marginLeft: theme.margins.m,
      marginTop: theme.margins.m
    },
    editBtn: {
      marginTop: theme.margins.m
    },
    postsContainer: {},
    followBtn: {
      marginVertical: theme.margins.m
    }
  })
  const { switchLang, toggleTheme, lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)

  const user = useContext(UserContext)!
  //console.log(user)
  const self = route.params!.uid === user.uid
  const [userProfile, setUserProfile] = useState<User | undefined>(undefined)
  const [follow, setFollow] = useState<Follow | undefined>(undefined)
  useEffect(() => {
    if (!self)
      return subscribeFollowing(route.params!.uid, user.uid, setFollow)
  }, [])
  useEffect(() => {
    return subscribeUser(route.params.uid, setUserProfile)
  }, [])

  const [menuVisible, setMenuVisible] = useState(false)
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={[theme.text.header, styles.username]}>
          {userProfile?.username}
        </Text>
        <Menu
          anchor={
            <IconButton
              onPress={() => setMenuVisible(true)}
              size={RFValue(26)}
              icon={"dots-vertical"}
            />
          }
          onDismiss={() => setMenuVisible(false)}
          visible={menuVisible}
        >
          <Menu.Item title={STRS.user.logout} onPress={logout} />
          <Menu.Item title={STRS.user.toggleTheme} onPress={toggleTheme} />
          {self && (
            <Menu.Item
              onPress={() => {
                navigation.navigate("EditProfile", { user: userProfile! })
                setMenuVisible(false)
              }}
              title={STRS.user.editProfile}
            />
          )}
          <Menu.Item
            title={theme.global_strings.langs.en}
            onPress={() => {
              switchLang("en")
              setMenuVisible(false)
            }}
          />
          <Menu.Item
            title={theme.global_strings.langs.pt}
            onPress={() => {
              switchLang("pt")
              setMenuVisible(false)
            }}
          />
        </Menu>
      </View>
      <InlineView style={styles.headerContainer}>
        {userProfile?.profileURL ? (
          <CachedImage source={userProfile.profileURL} style={styles.img} />
        ) : (
          <Image
            source={images.User}
            style={[styles.img, { tintColor: theme.colors.text }]}
          />
        )}
        <InlineView style={styles.statsContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FollowUsers", {
                type: "followers",
                uid: route.params.uid
              })
            }
          >
            <UserStat
              title={STRS.user.followers}
              stat={userProfile?.followers}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FollowUsers", {
                type: "following",
                uid: route.params.uid
              })
            }
          >
            <UserStat
              title={STRS.user.following}
              stat={userProfile?.following}
            />
          </TouchableOpacity>
        </InlineView>
      </InlineView>
      {!self &&
        (follow ? (
          <Button
            style={styles.followBtn}
            onPress={() => unfollowUser(user.uid, route.params!.uid)}
          >
            {STRS.user.unfollow}
          </Button>
        ) : (
          <Button
            style={styles.followBtn}
            onPress={() => followUser(user.uid, route.params!.uid)}
          >
            {STRS.user.follow}
          </Button>
        ))}
      <View style={styles.infoContainer}>
        {userProfile?.creationTime !== undefined && (
          <Text style={[styles.info, theme.text.body_s]}>
            {langStrings(theme, lang as langs).user.registered}{" "}
            {new Date(userProfile?.creationTime).toLocaleDateString()}
          </Text>
        )}
        {userProfile?.bio !== "" && (
          <Text style={styles.description}>{userProfile?.bio}</Text>
        )}
      </View>
      <Tab.Navigator
        backBehavior="none"
        initialLayout={{ width: Dimensions.get("window").width }}
        screenOptions={{
          tabBarLabelStyle: { ...theme.text.body_l },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text
        }}
        initialRouteName={`${userProfile?.posts} ${STRS.user.posts}`}
      >
        <Tab.Screen
          component={Posts}
          name={`${userProfile?.posts} ${STRS.user.posts}`}
          initialParams={{ uid: route.params!.uid }}
        />
        <Tab.Screen
          component={UserStats}
          name={STRS.user.stats}
          initialParams={{ uid: route.params!.uid }}
        />
      </Tab.Navigator>
    </>
  )
}
