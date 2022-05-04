import { StackScreenProps } from "@react-navigation/stack"
import React, { useState } from "react"
import { FlatList, LogBox, StyleSheet, Text } from "react-native"
import { Appbar } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import { Exercise } from "../../../../../dataDefinition/data"
import { images } from "../../../../lib/extra"
import { useTheme } from "../../../../providers/Theme"
import { Button } from "../../../reusable/Button"
import Loading from "../../../reusable/Loading"
import { RootStackParamListModelNav } from "../Models/ModelNav"
import ExerciseDescriptor from "./ExerciseDescriptor"
import ExerciseSearch from "./ExerciseSearch"

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state"
])

export default function ExerciseSelector({
  route,
  navigation
}: StackScreenProps<RootStackParamListModelNav, "ExerciseSelector">) {
  const theme = useTheme()
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [exercises, setExercises] = useState<Exercise[]>([])

  function handleExercisePress(exercise: Exercise) {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises((prevArr) => prevArr.filter((ex) => ex != exercise))
    } else {
      setSelectedExercises((prevArr) => [...prevArr, exercise])
    }
  }

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack}></Appbar.BackAction>
        <Appbar.Content title="Exercise Selector" />
      </Appbar>
      <ExerciseSearch setExercises={setExercises} setLoading={setLoading} />
      {loading ? (
        <Loading color={theme.colors.primary} style={{ marginVertical: 50 }} />
      ) : (
        <FlatList
          data={exercises}
          initialNumToRender={8}
          renderItem={({ item, index }) => (
            <ExerciseDescriptor
              key={index}
              exercise={item}
              onPress={handleExercisePress}
              checked={selectedExercises.includes(item)}
            />
          )}
          getItemLayout={(_, index) => ({
            length: 70,
            offset: 70 * index,
            index
          })}
          ListEmptyComponent={<Text>No Exercises found!</Text>}
          style={{
            marginTop: theme.margins.s,
            width: "100%"
          }}
          contentContainerStyle={{
            flexDirection: "column",
            alignItems: "center"
          }}
          showsVerticalScrollIndicator={true}
        />
      )}
      {selectedExercises.length > 0 ? (
        <Button
          style={styles.addBtn}
          labelStyle={{
            fontSize: RFValue(26)
          }}
          onPress={() => {
            route.params.onSubmit(selectedExercises)
            navigation.goBack()
          }}
          icon={images.Train}
          compact={true}
        >
          {}
        </Button>
      ) : (
        <Text></Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  addBtn: {
    width: 60,
    height: 60,
    marginTop: 0,
    borderRadius: 10
  }
})
