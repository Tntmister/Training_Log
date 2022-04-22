import React from "react"
import { StyleSheet, View } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { useTheme } from "../../providers/Theme"
import { Text } from "../reusable/Text"

const Search = () => {
  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }
  })
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: RFValue(50) }}>Search</Text>
    </View>
  )
}

export default Search
