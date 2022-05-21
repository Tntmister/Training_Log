import React, { useContext, useEffect, useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import InlineView from "../../reusable/InlineView"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../providers/Theme"
import { images } from "../../../lib/extra"
import Stat from "./reusable/Stat"
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
import Divider from "../../reusable/divider"
import { RFValue } from "react-native-responsive-fontsize"
import { logout } from "../../../lib/firebase/auth"

export default function Profile({
  navigation,
  route
}: StackScreenProps<RootStackParamUserNav, "Profile">) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    username: {
      textAlignVertical: "center",
      paddingLeft: theme.paddings.m
    },
    headerContainer: {
      justifyContent: "space-evenly"
    },
    img: {
      height: 80,
      width: 80,
      borderWidth: 2,
      borderColor: theme.colors.primary
    },
    statsContainer: {
      justifyContent: "space-evenly",
      width: "70%"
    },
    infoContainer: {
      paddingVertical: theme.margins.m,
      flex: 1
    },
    emailContainer: {
      justifyContent: "flex-start"
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
    }
  })
  const { switchLang, toggleTheme, lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)

  const user = useContext(UserContext)!
  const self = route.params.uid === user.uid
  const [userProfile, setUserProfile] = useState<User | undefined>(undefined)
  const [follow, setFollow] = useState<Follow | undefined>(undefined)
  useEffect(() => {
    if (!self) return subscribeFollowing(route.params.uid, user.uid, setFollow)
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
          <Stat title={STRS.user.posts} stat={userProfile?.posts} />
          <Stat title={STRS.user.followers} stat={userProfile?.followers} />
          <Stat title={STRS.user.following} stat={userProfile?.following} />
        </InlineView>
      </InlineView>
      <Divider />
      {!self &&
        (follow ? (
          <Button onPress={() => unfollowUser(user.uid, route.params.uid)}>
            {STRS.user.unfollow}
          </Button>
        ) : (
          <Button onPress={() => followUser(user.uid, route.params.uid)}>
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
    </>
  )
}
