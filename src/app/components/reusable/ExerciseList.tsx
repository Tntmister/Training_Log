import React, { useContext, useEffect, useState } from "react"

import { ExercisesContext } from "./../App"
import { Text, View, ScrollView, StyleSheet } from "react-native"
import { Searchbar } from "react-native-paper"
import { getExercises } from "../../lib/util"

export default function ExerciseList() {
  const exContext = useContext(ExercisesContext)
  const [searchQuery, setSearchQuery] = useState("")
  const [listOfExs, setListOfExs] = useState(getExercises(searchQuery))

  const onChangeSearch = (query: React.SetStateAction<string>) => {
    setSearchQuery(query)
    setListOfExs(getExercises(searchQuery))
  }

  //console.log(exContext[0])

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <ScrollView style={styles.container}>{listOfExs}</ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
})
