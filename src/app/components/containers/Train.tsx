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
      <StatusBar backgroundColor={theme.colors.background}></StatusBar>
      <View>
        <Header />
        <View
          style={{
            ...styles.title,
            backgroundColor: theme.colors.background
          }}
        >
          <Text style={{ ...styles.title, color: theme.colors.foreground }}>
            Training
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              ...styles.startButton,
              backgroundColor: theme.colors.main
            }}
          >
            <Text style={{ ...styles.text, color: theme.colors.foreground }}>
              Start Empty Training Session
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabHolder}>
          <View
            style={
              selectedTab === "models"
                ? { ...styles.tab, backgroundColor: theme.colors.main }
                : { ...styles.tab, backgroundColor: theme.colors.background }
            }
          >
            <MyButton title="Models" onPress={() => handlePress("models")} />
          </View>
          <View
            style={
              selectedTab === "exercises"
                ? { ...styles.tab, backgroundColor: theme.colors.main }
                : { ...styles.tab, backgroundColor: theme.colors.background }
            }
          >
            <MyButton
              title="Exercises"
              onPress={() => handlePress("exercises")}
            />
          </View>
        </View>
        {selectedTab === "models" ? <ModelList /> : <ExerciseList />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  },
  title: {
    fontSize: 25,
    fontWeight: "bold"
  },
  startButton: {
    width: "60%",
    borderRadius: 10,
    padding: 10
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
  }
})

export default Train
