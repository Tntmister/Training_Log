import React, { useState } from "react"
import { ThemeContext } from "../App"
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native"
import ScrollableContainer from "./ScrollableContainer"
import LinearGrad from "./LinearGrad"

export default function ModelList() {
  const theme = React.useContext(ThemeContext)
  //const [listOfModels, setListofModels] = useState([])

  /*const [searchQuery, setSearchQuery] = useState("")
  const [listOfExs, setListOfExs] = useState(
    getExercises(searchQuery, onExClick)
  )
  const [selectedExercise, setSelectedExercise] = React.useState("")

  function onExClick(exName: string) {
    setSelectedExercise(exName)
  }
  getExercises(searchQuery, onExClick)
  
  console.log("SELECTED EXRCISE -> " + selectedExercise)*/
  return (
    <View
      style={{
        ...styles.globalContainer,
        backgroundColor: theme.colors.background
      }}
    >
      <ScrollableContainer>
        <View style={styles.newModel}>
          <LinearGrad
            height={45}
            bgStart={theme.colors.main}
            bgEnd={theme.colors.mainEnd}
            center={true}
          >
            <TouchableOpacity
              style={{
                ...styles.newModelButton
              }}
              onPress={() => console.log("Creating a new Training Model")}
            >
              <Text
                style={{
                  ...styles.text,
                  color: theme.colors.foreground,
                  fontSize: theme.text.fontSizeSmall
                }}
              >
                Create a new Training Model
              </Text>
            </TouchableOpacity>
          </LinearGrad>
        </View>
        <ScrollView
          contentContainerStyle={{
            ...styles.container,
            backgroundColor: theme.colors.background
          }}
          showsVerticalScrollIndicator={false}
        >
          {/*<View style={{ flex: 1 }}>{listOfModels}</View>*/}
          <View>
            <Text style={{ color: theme.colors.foreground }}>MODEL LIST</Text>
          </View>
        </ScrollView>
      </ScrollableContainer>
      <View style={styles.startTraining}>
        <LinearGrad
          height={45}
          bgStart={theme.colors.main}
          bgEnd={theme.colors.mainEnd}
          center={true}
        >
          <TouchableOpacity
            style={{
              ...styles.startButton
            }}
            onPress={() => console.log("Starting and Empty Training Session")}
          >
            <Text
              style={{
                ...styles.text,
                color: theme.colors.foreground,
                fontSize: theme.text.fontSizeSmall
              }}
            >
              Start Empty Training Session
            </Text>
          </TouchableOpacity>
        </LinearGrad>
      </View>
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
    alignItems: "center",
    paddingVertical: 5
    //paddingBottom: 400 //TODO
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  search: {
    width: "95%",
    borderRadius: 10,
    marginTop: 10,
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
  },

  newModel: {
    //backgroundColor: "red",
    width: "80%",
    alignSelf: "center",
    alignItems: "center"
  },
  newModelButton: {
    borderRadius: 10,
    paddingHorizontal: 15
    //backgroundColor: "black"
  }
})
