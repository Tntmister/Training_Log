import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { IconButton } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import { Exercise, WESetClass } from "../../../../../dataDefinition/data"
import { useTheme } from "../../../../providers/Theme"
import InlineContainer from "../../../reusable/InlineView"
import { Text } from "../../../reusable/Text"
import { modelModes } from "../Models/Model"
import WESet from "./Sets/WESet"

export default function ProgrammedRegularExercise({
  exNum,
  exercise,
  mode,
  onSetChange
}: {
  exNum: number;
  exercise: Exercise;
  mode: modelModes;
  onSetChange: (exNum: number, sets: WESetClass[]) => void;
}) {
  const theme = useTheme()
  const [sets, setSets] = useState<WESetClass[]>([])

  useEffect(() => {
    setSets(exercise.sets as WESetClass[])
  }, [])
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

  function onRepMinChange(setIndex: number, newMin: number) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex
          ? { ...set, repRange: [newMin, set.repRange[1]] }
          : set
      )
    })
  }

  function onRepMaxChange(setIndex: number, newMax: number) {
    setSets((prevSets) => {
      return prevSets.map((set, index) =>
        index == setIndex
          ? { ...set, repRange: [set.repRange[0], newMax] }
          : set
      )
    })
  }

  function addSet() {
    setSets((prevSets) => [...prevSets, new WESetClass()])
  }

  function deleteSet(setIndex: number) {
    setSets((prevSets) => {
      return prevSets.filter((set, index) => index != setIndex)
    })
  }

  useEffect(() => {
    onSetChange(exNum, sets)
  }, [sets])

  const setElements = (exercise.sets as WESetClass[]).map((set, index) => (
    <WESet
      mode={mode}
      setNum={index}
      key={index}
      done={set.done}
      weight={set.weight}
      min={set.repRange[0]}
      max={set.repRange[1]}
      onChangeWeight={onWeightChange}
      onChangeRepMin={onRepMinChange}
      onChangeRepMax={onRepMaxChange}
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
            ...styles.repRange,
            ...styles.subtitle,
            color: theme.colors.text
          }}
        >
          Rep. Range
        </Text>
        <Text
          style={{
            ...styles.reps,
            ...styles.subtitle,
            color: theme.colors.text
          }}
        >
          Reps
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
  repRange: {
    //backgroundColor: "green",
    width: "35%"
  },
  reps: {
    //backgroundColor: "purple",
    width: "15%"
  },
  del: {
    //backgroundColor: "green",
    width: "15%"
  }
})
