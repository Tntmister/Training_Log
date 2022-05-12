import React, { useContext, useEffect, useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import InlineContainer from "../../reusable/InlineView"
import { useTheme } from "../../../providers/Theme"
import { images } from "../../../lib/extra"
import Stat from "./reusable/Stat"
import { Text } from "../../reusable/Text"
import { UserContext } from "../../../providers/User"
import { Button } from "../../reusable/Button"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamUserNav } from "./UserNav"
import { subscribeUser, User } from "../../../lib/user"
import { CachedImage } from "@georstat/react-native-image-cache"

export default function Profile({
  navigation,
  route
}: StackScreenProps<RootStackParamUserNav, "Profile">) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    headerContainer: {
      //backgroundColor: "green",
      marginTop: theme.margins.xl,
      justifyContent: "space-evenly"
      //paddingLeft: theme.margins.xs,
    },
    imgContainer: {
      width: 80,
      //backgroundColor: "red",
      justifyContent: "flex-start"
      //alignItems: "center",
    },
    img: {
      height: 80,
      width: 80,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: theme.colors.primary
    },
    statsContainer: {
      //backgroundColor: "blue",
      justifyContent: "space-evenly",
      width: "70%"
    },
    infoContainer: {
      paddingVertical: theme.margins.s,
      //backgroundColor: "magenta",
      justifyContent: "flex-start"
    },
    emailContainer: {
      justifyContent: "flex-start"
    },
    info: {
      width: "50%",
      //backgroundColor: "blue",
      marginLeft: theme.margins.m
    },
    description: {
      width: "90%",
      //backgroundColor: "green",
      marginLeft: theme.margins.m,
      marginTop: theme.margins.m
    },
    editBtn: {
      marginVertical: theme.margins.m
    }
  })
  const user = useContext(UserContext)!
  const user_uid = route.params ? route.params.uid : user.uid
  // user obtido por params (autenticado por default)
  const [userProfile, setUserProfile] = useState<User | undefined>(undefined)
  useEffect(() => {
    return subscribeUser(user_uid, setUserProfile)
  }, [route.params])

  console.log(userProfile)
  return (
    <>
      <InlineContainer style={styles.headerContainer}>
        <View style={styles.imgContainer}>
          {userProfile?.profileURL ? (
            <CachedImage source={userProfile.profileURL} style={styles.img} />
          ) : (
            <Image
              source={images.User}
              style={[styles.img, { tintColor: theme.colors.text }]}
            />
          )}
        </View>
        <InlineContainer style={styles.statsContainer}>
          {/* TODO: queries nº posts, followers, following */}
          <Stat name={"Shared"} value={25} />
          <Stat name={"Followers"} value={1467} />
          <Stat name={"Following"} value={217} />
        </InlineContainer>
      </InlineContainer>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>{userProfile?.username}</Text>
        {userProfile?.creationTime !== undefined && (
          <Text style={styles.info}>
            Joined {new Date(userProfile?.creationTime).toISOString()}
          </Text>
        )}
        {userProfile?.bio !== "" && (
          <Text style={styles.description}>{userProfile?.bio}</Text>
        )}
      </View>
      {user.uid === user_uid && (
        <Button
          style={styles.editBtn}
          onPress={() =>
            navigation.navigate("EditProfile", { user: userProfile! })
          }
        >
          Edit Profile
        </Button>
      )}
    </>
  )
}
