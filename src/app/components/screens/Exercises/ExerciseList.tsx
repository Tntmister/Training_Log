import React, { useEffect, useState } from "react"
import { ThemeContext } from "../../../App"
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native"
import { getExercises } from "../../../lib/util"
import ScrollableContainer from "../../reusable/ScrollableContainer"
import LinearGrad from "../../reusable/LinearGrad"
import Loading from "../../reusable/Loading"
import { Searchbar } from "react-native-paper"

export default function ExerciseList({ navigation }) {
  const theme = React.useContext(ThemeContext)

  const [searchQuery, setSearchQuery] = useState("")
  const [listOfExs, setListOfExs] = useState(
    getExercises(searchQuery, onExClick)
  )
  const [selectedExercise, setSelectedExercise] = React.useState("")

  function onExClick(exName: string) {
    setSelectedExercise(exName)
    console.log("INSIDE onClick -> " + exName)
    navigation.navigate("Exercise", { name: exName, bla: "bla bla" })
  }

  useEffect(() => {
    setListOfExs(() => getExercises(searchQuery, onExClick))
  }, [searchQuery])

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
      <ScrollableContainer>
        <View
          style={{
            ...styles.searchContainer,
            backgroundColor: theme.colors.background
          }}
        >
          <Searchbar
            placeholder="Search"
            onChangeText={(query) => setSearchQuery(query)}
            value={searchQuery}
            style={{
              ...styles.search,
              backgroundColor: theme.colors.foreground
            }}
            selectionColor={theme.colors.main}
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
              <Loading color={theme.colors.main} marginVertical={50} />
            ) : (
              listOfExs
            )}
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
            onPress={() => console.log("Starting empty training session")}
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
  }
})
