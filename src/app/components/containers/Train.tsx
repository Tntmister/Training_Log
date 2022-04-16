import React from "react"
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native"
import ExerciseList from "../reusable/ExerciseList"
import Header from "../reusable/Header"
import LinearGrad from "../reusable/LinearGrad"
import ModelList from "../reusable/ModelList"
import MyButton from "../reusable/MyButton"
import { ThemeContext } from "./../App"

const Train = () => {
  const [selectedTab, setSelectedTab] = React.useState("models")
  const theme = React.useContext(ThemeContext)

  function handlePress(selected: string) {
    if (selected !== selectedTab) setSelectedTab(selected)
  }

  console.log(selectedTab)

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <StatusBar backgroundColor={theme.colors.background} />

      <View>
        <Header title="Training" />
        <View style={styles.tabHolder}>
          <View>
            <MyButton title="Models" onPress={() => handlePress("models")} />
            <View
              style={
                selectedTab === "models"
                  ? { ...styles.underline, backgroundColor: theme.colors.main }
                  : styles.underline
              }
            />
          </View>
          <View>
            <MyButton
              title="Exercises"
              onPress={() => handlePress("exercises")}
            />
            <View
              style={
                selectedTab === "exercises"
                  ? { ...styles.underline, backgroundColor: theme.colors.main }
                  : styles.underline
              }
            />
          </View>
          {/*</View>*/}
        </View>
        {selectedTab === "models" ? <ModelList /> : <ExerciseList />}
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
              onPress={() => console.log("ola")}
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
    </View>
  )
}

const styles = StyleSheet.create({
  startTraining: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
    //backgroundColor: "white",
    marginTop: "auto"
  },
  container: {
    flex: 1
  },
  text: {
    fontWeight: "bold"
  },
  title: {
    fontWeight: "bold"
  },
  startButton: {
    flexDirection: "row",
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: "center",

    paddingVertical: 0
    //backgroundColor: "black",
  },
  tab: {
    marginVertical: 10,
    padding: 5
  },
  selectedTab: {
    marginVertical: 10,
    padding: 5
  },
  tabHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
    //backgroundColor: "white"
  },
  underline: {
    height: 3,
    borderRadius: 3,
    width: 90
  }
})

export default Train
