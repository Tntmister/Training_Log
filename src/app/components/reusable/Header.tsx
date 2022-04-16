import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { ThemeContext } from "../App"

const Header = (props: { title: string }) => {
  const theme = React.useContext(ThemeContext)
  return (
    <View style={styles.headerContainer}>
      <Text
        style={{
          ...styles.title,
          color: theme.colors.foreground,
          fontSize: theme.text.fontSizeBig
        }}
      >
        {props.title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 20
  },
  title: {
    fontWeight: "bold"
  }
})

export default Header
