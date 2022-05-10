import React, { useContext } from "react"
import { Image, StyleSheet, View } from "react-native"
import InlineContainer from "../../reusable/InlineView"
import { useTheme } from "../../../providers/Theme"
import { getDate, images } from "../../../lib/extra"
import Stat from "./reusable/Stat"
import { Text } from "../../reusable/Text"
import { UserContext } from "../../../providers/User"
import { Button } from "../../reusable/Button"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamUserNav } from "./UserNav"

export default function Profile({
  navigation
}: StackScreenProps<RootStackParamUserNav, "Profile">) {
  const user = useContext(UserContext)
  console.log(user)
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
  const date = getDate(user!.metadata.creationTime)
  return (
    <>
      <InlineContainer style={styles.headerContainer}>
        <View style={styles.imgContainer}>
          <Image source={images.User} style={styles.img} />
        </View>
        <InlineContainer style={styles.statsContainer}>
          <Stat name={"Shared"} value={25} />
          <Stat name={"Followers"} value={1467} />
          <Stat name={"Following"} value={217} />
        </InlineContainer>
      </InlineContainer>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>{user!.displayName}</Text>
        <Text style={styles.info}>Started in {date}</Text>
        <Text style={styles.description}>Some description...</Text>
      </View>
      <Button
        style={styles.editBtn}
        onPress={() => navigation.navigate("EditProfile")}
      >
        Edit Profile
      </Button>
    </>
  )
}
