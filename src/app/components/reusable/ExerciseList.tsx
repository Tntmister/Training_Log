import React, { useState } from "react"
import { ThemeContext } from "../App"
import { View, ScrollView, StyleSheet } from "react-native"
import { Searchbar } from "react-native-paper"
import { getExercises } from "../../lib/util"
import ScrollableContainer from "./ScrollableContainer"

export default function ExerciseList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [listOfExs, setListOfExs] = useState(getExercises(searchQuery))
  const theme = React.useContext(ThemeContext)
  return (
    <ScrollableContainer>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => setSearchQuery(query)}
          onIconPress={() => setListOfExs(getExercises(searchQuery))}
          value={searchQuery}
          style={{ ...styles.search, backgroundColor: theme.colors.foreground }}
          selectionColor={theme.colors.main}
          inputStyle={{
            paddingVertical: 0
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>{listOfExs}</View>
      </ScrollView>
    </ScrollableContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddiingvertical: 5
    //paddingBottom: 400 //TODO
  },
  searchContainer: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "center"
  },
  search: {
    flexDirection: "row",
    width: "95%",
    borderRadius: 10,
    marginTop: 10,
    height: 35
  },
  globalContainer: {
    height: "75%"
    //borderWidth: 2,
    //borderColor: "black"
  }
})
