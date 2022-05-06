import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { IconButton } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import { CardioSetClass, Exercise } from "../../../../../dataDefinition/data"
import { useTheme } from "../../../../providers/Theme"
import InlineContainer from "../../../reusable/InlineView"
import { Text } from "../../../reusable/Text"
import { modelModes } from "../Models/Model"
import CardioSet from "./Sets/CardioSet"

export default function ProgrammedCardioExercise({
  exNum,
  exercise,
  mode,
  onSetChange
}: {
  exNum: number;
  exercise: Exercise;
  mode: modelModes;
  onSetChange: (exNum: number, sets: CardioSetClass[]) => void;
}) {
  const theme = useTheme()
  const [sets, setSets] = useState<CardioSetClass[]>([])

  useEffect(() => {
    setSets(exercise.sets as CardioSetClass[])
  }, [])

  useEffect(() => {
    onSetChange(exNum, sets)
  }, [sets])

  function onSetCheckBox(setIndex: number) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex ? { ...set, done: !set.done } : set
      )
    })
  }

  function onWeightChange(setIndex: number, weight: number) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex ? { ...set, weight: weight } : set
      )
    })
  }

  function onDistanceChange(setIndex: number, dist: number) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex ? { ...set, distance: dist } : set
      )
    })
  }

  function onDurationChange(setIndex: number, dur: string) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex ? { ...set, duration: dur } : set
      )
    })
  }

  function deleteSet(setIndex: number) {
    setSets((prevSets) => {
      return prevSets.filter((set, index) => index != setIndex)
    })
  }
  function addSet() {
    setSets((prevSets) => [...prevSets, new CardioSetClass()])
  }

  const setElements = (exercise.sets as CardioSetClass[]).map((set, index) => (
    <CardioSet
      mode={mode}
      setNum={index}
      key={index}
      done={set.done}
      weight={set.weight}
      duration={set.duration}
      distance={set.distance}
      onChangeWeight={onWeightChange}
      onChangeDistance={onDistanceChange}
      onChangeDuration={onDurationChange}
      onDeletePress={deleteSet}
      onSetCheckbox={onSetCheckBox}
    />
  ))
  return (
    <>
      <InlineContainer
        style={{ ...styles.subtitleContainer, marginTop: theme.margins.xs }}
      >
        <Text
          style={{
            ...styles.setNum,
            ...styles.subtitle,
            color: theme.colors.text
          }}
        >
          Set
        </Text>
        <Text
          style={{
            ...styles.weight,
            ...styles.subtitle,
            color: theme.colors.text
          }}
        >
          Weight
        </Text>
        <Text
          style={{
            ...styles.distance,
            ...styles.subtitle,
            color: theme.colors.text
          }}
        >
          Distance
        </Text>
        <Text
          style={{
            ...styles.time,
            ...styles.subtitle,
            color: theme.colors.text
          }}
        >
          Duration
        </Text>
        <View
          style={{
            ...styles.del,
            ...styles.subtitle
          }}
        />
      </InlineContainer>

      {setElements}

      {mode == modelModes.Edit && (
        <IconButton
          color={theme.colors.primary}
          size={30}
          style={{
            width: "100%",
            alignSelf: "center"
          }}
          onPress={addSet}
          icon={"plus"}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  subtitleContainer: {
    justifyContent: "space-between"
  },
  subtitle: {
    textAlign: "center",
    fontSize: RFValue(18)
  },
  setNum: {
    //backgroundColor: "green",
    width: "10%"
  },
  weight: {
    //backgroundColor: "purple",
    width: "20%"
  },
  distance: {
    //backgroundColor: "green",
    width: "25%"
  },
  time: {
    //backgroundColor: "purple",
    width: "25%"
  },
  del: {
    //backgroundColor: "green",
    width: "10%"
  }
})
