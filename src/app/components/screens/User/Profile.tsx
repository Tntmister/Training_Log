import React, { useContext } from "react"
import { Image, StyleSheet, View } from "react-native"
import InlineContainer from "../../reusable/InlineView"
import { useTheme } from "../../../providers/Theme"
import { images } from "../../../lib/extra"
import Stat from "./reusable/Stat"
import { Text } from "../../reusable/Text"
import { UserContext } from "../../../providers/User"

export default function Profile() {
  const user = useContext(UserContext)
  console.log(user)
  const theme = useTheme()
  const styles = StyleSheet.create({
    headerContainer: {
      marginTop: theme.margins.xl
      //paddingLeft: theme.margins.xs,
      //backgroundColor: "green"
    },
    imgContainer: {
      width: 80,
      justifyContent: "flex-start"
      //alignItems: "center",
      //backgroundColor: "red"
    },
    img: {
      height: 80,
      width: 80,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: theme.colors.text
    },
    statsContainer: {
      width: "70%"
    },
    nameContainer: {
      paddingTop: theme.margins.s,
      justifyContent: "flex-start"
    },
    emailContainer: {
      justifyContent: "flex-start"
    },
    info: {
      width: "70%",
      paddingLeft: theme.margins.m
    }
  })
  return (
    <>
      <InlineContainer style={styles.headerContainer}>
        <View style={styles.imgContainer}>
          <Image source={images.User} style={styles.img} />
        </View>
        <InlineContainer style={styles.statsContainer}>
          <Stat name={"Models"} value={25} />
          <Stat name={"Followers"} value={1467} />
          <Stat name={"Following"} value={217} />
        </InlineContainer>
      </InlineContainer>
      <InlineContainer style={styles.nameContainer}>
        <Text style={styles.info}>{user!.displayName}</Text>
      </InlineContainer>
      <InlineContainer style={styles.emailContainer}>
        <Text style={styles.info}>{user!.email}</Text>
      </InlineContainer>
    </>
  )
}
