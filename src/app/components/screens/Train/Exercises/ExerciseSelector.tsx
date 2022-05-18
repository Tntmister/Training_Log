import { StackScreenProps } from "@react-navigation/stack"
import React, { useCallback, useState } from "react"
import { FlatList, LogBox, Text, View } from "react-native"
import { Appbar } from "react-native-paper"
import { Exercise } from "../../../../lib/types/train"
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

  const handleExercisePress = useCallback(
    (exercise: Exercise, checked: boolean, toggleCheck: () => void) => {
      checked
        ? setSelectedExercises((prevArr) =>
          prevArr.filter((ex) => ex != exercise)
        )
        : setSelectedExercises((prevArr) => [...prevArr, exercise])

      toggleCheck()
    },
    []
  )

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack}></Appbar.BackAction>
        <Appbar.Content title="Add Exercise to Model" />
      </Appbar>
      <ExerciseSearch setExercises={setExercises} setLoading={setLoading} />
      <View style={{ flex: 1 }}>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={exercises}
            renderItem={({ item, index }) => (
              <ExerciseDescriptor
                key={index}
                exercise={item}
                onPress={handleExercisePress}
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
              flex: 1
            }}
            contentContainerStyle={{
              flexDirection: "column",
              alignItems: "center"
            }}
            showsVerticalScrollIndicator={true}
          />
        )}
      </View>
      <Button
        disabled={selectedExercises.length === 0}
        style={{ marginTop: theme.margins.m }}
        labelStyle={theme.text.body_l}
        onPress={() => {
          route.params.onSubmit(selectedExercises)
          navigation.goBack()
        }}
      >
        Add Exercise
      </Button>
    </>
  )
}
