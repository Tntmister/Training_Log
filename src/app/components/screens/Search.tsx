import React from "react"
import { StyleSheet, View } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { Text } from "../reusable/Text"

const Search = () => {
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
