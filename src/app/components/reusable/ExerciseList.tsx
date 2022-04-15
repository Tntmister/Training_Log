import React, { useState } from "react"

import { View, ScrollView, StyleSheet } from "react-native"
import { Searchbar } from "react-native-paper"
import { getExercises } from "../../lib/util"

export default function ExerciseList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [listOfExs, setListOfExs] = useState(getExercises(searchQuery))

  return (
    <View>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => setSearchQuery(query)}
          onIconPress={() => setListOfExs(getExercises(searchQuery))}
          value={searchQuery}
          style={styles.search}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>{listOfExs}</View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 400 //TODO
  },
  searchContainer: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "center"
  },
  search: {
    width: "80%"
  }
})
