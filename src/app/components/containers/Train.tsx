import React from "react"
import { Button, StatusBar, StyleSheet, Text, View } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import Header from "../reusable/Header"
import Style from "../../styles/styles"
import MyButton from "../reusable/MyButton"
const Train = () => {
  const [selectedTab, setSelectedTab] = React.useState("models")

  function handlePress(selected: string) {
    if (selected !== selectedTab) setSelectedTab(selected)
  }

  console.log(selectedTab)

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Style.background[1]}></StatusBar>
      <View>
        <Header />
        <View style={styles.title}>
          <Text style={styles.title}>Training</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.text}>Start Empty Training Session</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabHolder}>
          <View
            style={selectedTab === "models" ? styles.selectedTab : styles.tab}
          >
            <MyButton title="Models" onPress={() => handlePress("models")} />
          </View>
          <View
            style={
              selectedTab === "exercises" ? styles.selectedTab : styles.tab
            }
          >
            <MyButton
              title="Exercises"
              onPress={() => handlePress("exercises")}
            />
          </View>
        </View>
        <ScrollView>
          <Text>Um treino</Text>
          <Text>Um treino</Text>
          <Text>Um treino</Text>
          <Text>Um treino</Text>
          <Text>Um treino</Text>
          <Text>Um treino</Text>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.background[1]
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    color: Style.text[1]
  },
  title: {
    backgroundColor: Style.background[1],
    fontSize: 25,
    color: Style.text[1],
    fontWeight: "bold"
  },
  startButton: {
    backgroundColor: Style.main[1],
    width: "60%",
    borderRadius: 10,
    padding: 10
  },
  tab: {
    marginVertical: 10,
    padding: 5,
    borderWidth: 3,
    borderTopColor: Style.background[1],
    borderRightColor: Style.background[1],
    borderLeftColor: Style.background[1],
    borderBottomColor: Style.background[1]
  },
  selectedTab: {
    marginVertical: 10,
    padding: 5,
    borderWidth: 3,
    borderTopColor: Style.background[1],
    borderRightColor: Style.background[1],
    borderLeftColor: Style.background[1],
    borderBottomColor: Style.main[1]
  },
  tabHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  }
})

export default Train
