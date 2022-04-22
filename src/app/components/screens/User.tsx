import React from "react"
import { StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { RFValue } from "react-native-responsive-fontsize"
import { useTheme } from "../../providers/Theme"
import { Text } from "../reusable/Text"

const User = () => {
  const theme = useTheme()
  const styles = StyleSheet.create({
    Scontainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    background: {
      width: "100%",
      height: "50%",
      paddingHorizontal: theme.paddings.xl,
      borderRadius: 35
    }
  })
  return (
    <View style={styles.Scontainer}>
      <LinearGradient
        colors={["rgba(254,103,81,1)", "rgba(81,103,254,1)"]}
        style={styles.background}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Text>User</Text>
      </LinearGradient>
    </View>
  )
}

export default User
