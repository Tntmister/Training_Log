import React, { useState } from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import { getExercises } from "../../../lib/util"
import Loading from "../../reusable/Loading"
import { Searchbar } from "react-native-paper"
import { useTheme } from "../../../providers/Theme"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "./ExerciseNav"

export default function ExerciseList({
  navigation
}: StackScreenProps<RootStackParamList, "ExerciseList">) {
  const theme = useTheme()

  const [searchQuery, setSearchQuery] = useState("")
  const [listOfExs, setListOfExs] = useState(
    getExercises(searchQuery, onExClick)
  )
  const [selectedExercise, setSelectedExercise] = React.useState("")

  function searchExercises(query: string) {
    setSearchQuery(query)
    setListOfExs(getExercises(searchQuery, onExClick))
  }

  function onExClick(exName: string) {
    setSelectedExercise(exName)
    console.log("INSIDE onClick -> " + exName)
    navigation.navigate("Exercise", { name: exName })
  }

  console.log("SELECTED EXRCISE -> " + selectedExercise)
  console.log("LIST LENGTH -> " + listOfExs.length)
  console.log("QUERY -> " + searchQuery + " (" + searchQuery.length + ")")
  return (
    <View
      style={{
        ...styles.globalContainer,
        backgroundColor: theme.colors.background
      }}
    >
      <View
        style={{
          ...styles.searchContainer,
          backgroundColor: theme.colors.background
        }}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => searchExercises(query)}
          value={searchQuery}
          style={{
            ...styles.search,
            backgroundColor: theme.colors.surface
          }}
          selectionColor={theme.colors.primary}
          inputStyle={{
            paddingVertical: 0
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          ...styles.container,
          backgroundColor: theme.colors.background
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
          {searchQuery.length == 0 ? (
            listOfExs
          ) : searchQuery.length < 3 && listOfExs.length == 1 ? (
            <Loading color={theme.colors.primary} marginVertical={50} />
          ) : (
            listOfExs
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  globalContainer: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
    //paddingVertical: 5
    //paddingBottom: 400 //TODO
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 5
  },
  search: {
    width: "95%",
    borderRadius: 10,
    marginTop: 0,
    height: 35
  },
  startTraining: {
    width: "80%",
    alignSelf: "center"
  },
  text: {
    fontWeight: "bold"
  },
  title: {
    fontWeight: "bold"
  },
  startButton: {
    borderRadius: 10,
    paddingHorizontal: 15
    //backgroundColor: "black"
  }
})
